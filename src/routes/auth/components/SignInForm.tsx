import AutoForm, { AutoFormSubmit } from "@/components/shadcn/ui/auto-form";
import { signinFormSchema, TUserSigninFormFields, TUserSignUpFormFields } from "@/lib/auth/schema";
import { Link, useMutation, useSSM, useSubmit } from "rakkasjs";
import { OAuthproviders } from "./OAuthProviders";
import { emailPasswordLogin } from "@/routes/api/auth/helpers/auth-methods";




interface SignInFormProps {}


export function SignInForm({}: SignInFormProps) {
const mutation = useSSM<unknown,TUserSigninFormFields>(async(ctx,vars) => {
    try {
      const res = await emailPasswordLogin(vars.email, vars.password);
      ctx.request.headers.set("Set-Cookie", res.sessionCookie.serialize());
      ctx.request.headers.set("Location", "/");
      console.log(res);
     // return json(res)
    } catch (error:any) {
      console.log({error:error.message})
    }


  })

  // const mutation = useMutation<unknown,TUserSigninFormFields>(async(ctx,vars) => {
  //    const api_url = new URL(ctx.request.url).origin + "/api/auth";
  //   // console.log("api_url",api_url)
  //   await fetch(api_url, {
  //     method: "POST",
  //   body: JSON.stringify(vars),
  //   }).then(res => {
  //     return res.json();
  //   }).then(data => {
  //     return data
  //   })
  // })


  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-center p-5 gap-3">
      <AutoForm
       onSubmit={(values) => {
       mutation.mutateAsync(values);
        }}
        // Pass the schema to the form
        formSchema={signinFormSchema}
        // You can add additional config for each field
        // to customize the UI
        fieldConfig={{
          password: {
            // Use "inputProps" to pass props to the input component
            // You can use any props that the component accepts
            inputProps: {
              type: "password",
              },
          },
        }}
      >
        {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
        <AutoFormSubmit>Submit</AutoFormSubmit>

        {/*
      All children passed to the form will be rendered below the form.
      */}
        <p className="text-gray-500 text-sm">
          By submitting this form, you agree to our{" "}
          <a href="#" className="text-primary underline">
            terms and conditions
          </a>
          .
        </p>
        <p className="text-gray-500 text-sm">
           New here? Create an account{" "}
          <Link
            href="/auth/signup"
            className="text-primary underline hover:text-accent"
          >Signup
          </Link>
        </p>
      </AutoForm>
      <OAuthproviders/>
    </div>
  );
}
