import { PageProps } from "rakkasjs"
import { SignInForm } from "./components/SignInForm"

export default function Page({}:PageProps) {
return (
<div className="w-full min-h-screen h-full flex items-center justify-center">
    <SignInForm/>
</div>
)}
