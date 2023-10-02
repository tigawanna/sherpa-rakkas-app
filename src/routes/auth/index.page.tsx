import { signinFormSchema } from "@/lib/auth/schema";
import { SignInForm } from "./components/SignInForm";
import { ActionHandler,PageProps,Head } from "rakkasjs";
import { emailPasswordLogin } from "../api/auth/helpers/auth-methods";
export default function Page({ actionData }: PageProps) {

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center">
        <Head title="Sign in" description={"Sign in to your account"}/>
      <SignInForm actionData={actionData} />
    </div>
  );
}

export const action: ActionHandler = async (ctx) => {
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
