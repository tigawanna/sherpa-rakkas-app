import AutoForm, { AutoFormSubmit } from "@/components/shadcn/ui/auto-form";
import { signinFormSchema } from "@/lib/auth/schema";

import * as z from "zod";
interface SignInFormProps {}


export function SignInForm({}: SignInFormProps) {
  // Define your form schema using zod

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center p-5">
      
      <AutoForm
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
              placeholder: "••••••••",
            },
          },
      }}
      >
        {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
        <AutoFormSubmit>Send now</AutoFormSubmit>

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
      </AutoForm>
    </div>
  );
}
