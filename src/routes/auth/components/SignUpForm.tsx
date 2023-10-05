import { Button } from "@/components/shadcn/ui/button";
import { OAuthproviders } from "./OAuthProviders";
import { Link,useSubmit } from "rakkasjs";
import { TUserSignUpFormFields } from "@/lib/auth/schema";
import { ActionErrorData } from "@/lib/rakkas/utils/actions";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";


interface SignupFormProps {
  actionData: ActionErrorData<Partial<TUserSignUpFormFields>>;
}

export function SignUpForm({ actionData }: SignupFormProps) {
const {  isLoading,submitHandler } = useSubmit();
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center p-5 gap-5">
      <div className="w-full h-full md:w-[60%] flex flex-col gap-4">
        <form
          className="w-full h-full  flex flex-col items-center justify-center gap-4"
          method="POST"
        >
          <h1 className="text-2xl font-bold">Sign Up</h1>

          <TheTextInput<TUserSignUpFormFields>
            field_key={"email"}
            field_name="Email"
            required
            error_message={actionData?.error?.fields?.email}
            defaultValue={actionData?.defaultValues?.email}
          />
          <TheTextInput<TUserSignUpFormFields>
            field_key={"username"}
            field_name="Useranme"
            required
            min={4}
            error_message={actionData?.error?.fields?.username}
            defaultValue={actionData?.defaultValues?.username}
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
            Sign Up
          </Button>
        </form>

        <OAuthproviders />
      </div>
      <p className=" text-sm">
        Already have an account ?{" "}
        <Link href="/auth" className="text-accent">
          Log in
        </Link>
      </p>
    </div>
  );
}
