import { z } from "zod";

export const signupFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })

    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Email address"),
  username: z
    .string({
      required_error: "Username is required.",
    })
    // You can use zod's built-in validation as normal
    .min(2, {
      message: "Username must be at least 2 characters.",
    }),

  password: z
    .string({
      required_error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export type TUserSignUpFormFields = z.infer<typeof signupFormSchema>;

export const signinFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string({
      required_error: "Password is required.",
    })
    // Use the "describe" method to set the label
    // If no label is set, the field name will be used
    // and un-camel-cased
    .describe("Your secure password")
    .min(8, {
      message: "Password must be at least 8 characters.",
    }),
});

export type TUserSigninFormFields = z.infer<typeof signinFormSchema>;
