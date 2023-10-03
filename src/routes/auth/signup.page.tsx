import { ActionHandler, ActionResult, PageProps } from "rakkasjs"
import { SignUpForm } from "./components/SignUpForm"
import { TUserSignUpFormFields, signupFormSchema } from "@/lib/auth/schema";
import { emailPasswordSignup } from "../api/auth/helpers/auth-methods";
import { ZodError } from "zod";
import {  mapPrismaIssueToField, mapZodIssueToField } from "@/utils/error-handling";
import { Prisma } from "@prisma/client";
import { ActionErrorData } from "@/lib/rakkas/utils/actions";
export default function Page({actionData}:PageProps) {
return (
<div className="w-full min-h-screen h-full flex items-center justify-center">
    <SignUpForm actionData={actionData}/>
</div>
)}

export const action: ActionHandler = async (
  ctx
): Promise<ActionResult<ActionErrorData<Partial<TUserSignUpFormFields>>>> => {
  const formData = await ctx.requestContext.request.formData();
  const defaultValues = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    username: formData.get("username")?.toString(),
  };

  try {
    const { password, email, username } = signupFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      username: formData.get("username"),
    });
    const res = await emailPasswordSignup(email, password, username);

    return {
      redirect: "/",
      headers: {
        "Set-Cookie": res.sessionCookie.serialize(),
      },
    };
  } catch (error: any) {
    
    if (error instanceof ZodError) {
      console.log("ZOD ACTION ERROR ==>", error);
      return {
        data: {
          error: {
            fields: {
              username: mapZodIssueToField(error, "username"),
              email: mapZodIssueToField(error, "email"),
              password: mapZodIssueToField(error, "password"),
            },
            message: "Incorrect fields",
          },
          defaultValues,
        },
      };
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("PRISMA ACTION ERROR ==>", error);
      return {
        data: {
          error: {
            fields: {
              username: mapPrismaIssueToField(error, "username"),
              email: mapPrismaIssueToField(error, "email"),
              // password: mapPrismaIssueToField(error, "password"),
            },
            message: "Incorrect fields",
          },
          defaultValues,
        },
      };
    }
    console.log("UNCLASSIFIED ACTION ERROR ==>", error);
    return {
      data: {
        error: {
          fields: {
            // username: mapPrismaIssueToField(error, "username"),
            // email: mapPrismaIssueToField(error, "email"),
            // password: mapPrismaIssueToField(error, "password"),
          },
          message: "error creating account",
        },
      defaultValues
      },
    };
  }
};



