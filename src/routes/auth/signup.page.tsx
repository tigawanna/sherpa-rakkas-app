import { ActionHandler, PageProps } from "rakkasjs"
import { SignUpForm } from "./components/SignUpForm"
import { signupFormSchema } from "@/lib/auth/schema";
import { emailPasswordSignup } from "../api/auth/helpers/auth-methods";
export default function Page({actionData}:PageProps) {
return (
<div className="w-full min-h-screen h-full flex items-center justify-center">
    <SignUpForm actionData={actionData}/>
</div>
)}

export const action: ActionHandler = async (ctx) => {
  const formData = await ctx.requestContext.request.formData();
  try {
    const { password, email, username } = signupFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
      username:formData.get("username"),
    });
    const res = await emailPasswordSignup(email, password,username);

    return {
      redirect: "/",
      headers: {
        "Set-Cookie": res.sessionCookie.serialize(),
      },
    };
  } catch (error: any) {
    console.log({ error });
    return {
      data: {
        message: "Incorrect emal or password",
        // We'll echo the data back so that the form doesn't get reset
        email: formData.get("email"),
        username: formData.get("username"),
        password: formData.get("password"),
      },
    };
  }
};
