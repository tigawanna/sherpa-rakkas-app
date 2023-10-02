import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { Button } from "@/components/shadcn/ui/button";
import { OAuthproviders } from "./OAuthProviders";
import { Link } from "rakkasjs";
interface SignupFormProps {
  actionData:any
}

export function SignUpForm({actionData}: SignupFormProps) {
  // Define your form schema using zod

  return (
    <div className="w-full min-h-screen h-full flex items-center justify-center p-5">
      <div className="w-full h-full md:w-[60%] flex flex-col gap-4">
        <form
          className="w-full h-full  flex flex-col items-center justify-center gap-4"
          method="POST"
        >
          <h1 className="text-2xl font-bold">Sign Up</h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="font-bold">
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
            <Label htmlFor="username" className="font-bold">
              Username
            </Label>
            <Input
              name="username"
              about="username"
              defaultValue={actionData?.username}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password" className="font-bold">
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
      <p className=" text-sm">Already have an account ? <Link href="/auth" className="text-accent">Log in</Link></p>

      </div>
    </div>
  );
}


