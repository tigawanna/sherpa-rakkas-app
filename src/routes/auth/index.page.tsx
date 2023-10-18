import { TUserSigninFormFields, signinFormSchema } from "@/lib/auth/schema";
import { SignInForm } from "./components/SignInForm";
import { ActionHandler, PageProps, Head, ActionResult } from "rakkasjs";
import { ActionErrorData } from "@/lib/rakkas/utils/actions";
import {
  mapZodIssueToField,
  mapPrismaIssueToField,
} from "@/utils/error-handling";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { LuciaError } from "lucia";
import { emailPasswordLogin } from "../api/helpers/auth-methods";
export default function SignInPage({ actionData }: PageProps) {
  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center">
      <Head title="Sign in" description={"Sign in to your account"} />
      <SignInForm actionData={actionData} />
    </div>
  );
}

export const action: ActionHandler = async (
  ctx
): Promise<ActionResult<ActionErrorData<Partial<TUserSigninFormFields>>>> => {
  const destination =
    ctx.requestContext.url.searchParams.get("redirect") ?? "dashboard";

  const formData = await ctx.requestContext.request.formData();
  const defaultValues = {
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  };
  
  try {
    const { password, email } = signinFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const res = await emailPasswordLogin(email, password);
    const redirect_url = new URL(ctx.url);
    redirect_url.pathname = destination;
    redirect_url.searchParams.delete("redirect");
    return {
      redirect: redirect_url,
      headers: {
        "Set-Cookie": res.sessionCookie.serialize(),
      },
    };
  } catch (error: any) {
    
    if (error instanceof ZodError) {
      // console.log("ZOD ACTION ERROR ==>", error);
      return {
        data: {
          error: {
            fields: {
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
      // console.log("PRISMA ACTION ERROR ==>", error);
      return {
        data: {
          error: {
            fields: {
              email: mapPrismaIssueToField(error, "email"),
              password: mapPrismaIssueToField(error, "password"),
            },
            message: "Incorrect fields",
          },
          defaultValues,
        },
      };
    }
    if (error instanceof LuciaError) {
      // console.log("LUCIA ACTION ERROR ==>", error);
      return {
        data: {
          error: {
            fields: {
              // username: mapPrismaIssueToField(error, "username"),
              // email: mapPrismaIssueToField(error, "email"),
              // password: mapPrismaIssueToField(error, "password"),
            },
            message: "invalid credentials ",
          },
          defaultValues,
        },
      };
    }
    // console.log("UNCLASSIFIED ACTION ERROR ==>", error);
    return {
      data: {
        error: {
          fields: {
            // username: mapPrismaIssueToField(error, "username"),
            // email: mapPrismaIssueToField(error, "email"),
            // password: mapPrismaIssueToField(error, "password"),
          },
          message: "error logging in ",
        },
        defaultValues,
      },
    };
  }
};
