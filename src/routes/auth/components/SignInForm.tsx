import {
  TUserSigninFormFields,
  TUserSignUpFormFields,
} from "@/lib/auth/schema";
import { Link } from "rakkasjs";
import { OAuthproviders } from "./OAuthProviders";
import { Button } from "@/components/shadcn/ui/button";
import { ActionErrorData } from "@/lib/rakkas/utils/actions";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";

interface SignInFormProps {
  actionData: ActionErrorData<Partial<TUserSigninFormFields>>;
}

export function SignInForm({ actionData }: SignInFormProps) {
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center p-5 gap-5">
      <div className="w-full h-full md:w-[60%] flex flex-col gap-4">
        <form
          className="w-full h-full  flex flex-col items-center justify-center gap-4"
          method="POST"
        >
          <h1 className="text-2xl font-bold">Sign In</h1>

          <TheTextInput<TUserSignUpFormFields>
            field_key={"email"}
            field_name="Email"
            required
            error_message={actionData?.error?.fields?.email}
            defaultValue={actionData?.defaultValues?.email}
          />

          <TheTextInput<TUserSignUpFormFields>
            field_key={"password"}
            field_name="password"
            type="password"
            required
            min={8}
            error_message={actionData?.error?.fields?.password}
            defaultValue={actionData?.defaultValues?.password}
          />
          {actionData && (
            <p className="text-sm text-error">{actionData?.error?.message}</p>
          )}
          <Button
            type="submit"
            className="btn btn-sm btn-outline min-w-[50%]"
            variant={"ghost"}
            size={"sm"}
          >
            Sign In
          </Button>
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
