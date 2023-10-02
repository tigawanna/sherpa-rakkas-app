import AutoForm, { AutoFormSubmit } from "@/components/shadcn/ui/auto-form";
import { signinFormSchema, TUserSigninFormFields, TUserSignUpFormFields } from "@/lib/auth/schema";
import { ActionHandler, Link, useMutation, useSSM, useSubmit } from "rakkasjs";
import { OAuthproviders } from "./OAuthProviders";
import { emailPasswordLogin } from "@/routes/api/auth/helpers/auth-methods";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";




interface SignInFormProps {
  actionData:any
}


export function SignInForm({actionData}: SignInFormProps) {
return (
  <div className="w-full min-h-screen h-full flex flex-col items-center justify-center p-5 gap-3">
    <div className="w-full h-full md:w-[60%] flex flex-col gap-4">
      <form
        className="w-full h-full  flex flex-col items-center justify-center gap-4"
        method="POST"
      >
        <h1 className="text-2xl font-bold">Sign in</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email" className="fint-bold">
            Email
          </Label>
          <Input
            type="email"
            name="email"
            about="Email"
            defaultValue={actionData?.email}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password" className="fint-bold">
            Password
          </Label>
          <Input
            name="password"
            type="password"
            about="Password"
            defaultValue={actionData?.password}
          />
        </div>

        {actionData && <p style={{ color: "red" }}>{actionData.message}</p>}
        <Button type="submit">Submit</Button>
      </form>

      <OAuthproviders />
    </div>
    <p className=" text-sm">
      New here ? Create an account ?{" "}
      <Link href="/auth/signup" className="text-accent">
        Sign up
      </Link>
    </p>
  </div>
);
}


