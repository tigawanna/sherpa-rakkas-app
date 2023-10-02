import { signinFormSchema } from "@/lib/auth/schema";
import { SignInForm } from "./components/SignInForm";
import { ActionHandler, Head, PageProps } from "rakkasjs";
import { emailPasswordLogin } from "../api/auth/helpers/auth-methods";
export default function Page({ actionData }: PageProps) {
    console.log({actionData})
  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center">
      <SignInForm actionData={actionData} />
    </div>
  );
}

export const action: ActionHandler = async (ctx) => {
console.log("sign in user action")
  const formData = await ctx.requestContext.request.formData();
  try {
    const { password, email } = signinFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });
    const res = await emailPasswordLogin(email, password);

    return {
      redirect: "/",
      headers: {
        "Set-Cookie": res.sessionCookie.serialize(),
      }

    };
  } catch (error:any) {
    console.log({error})
    return {
      data: {
        message: "Incorrect emal or password",
        // We'll echo the data back so that the form doesn't get reset
        email: formData.get("email"),
        password: formData.get("password"),
      },
    };
  }
};
