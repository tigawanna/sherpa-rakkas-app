import { PageProps } from "rakkasjs"
import { SignUpForm } from "./components/SignUpForm"
export default function Page({}:PageProps) {
return (
<div className="w-full min-h-screen h-full flex items-center justify-center">
    <SignUpForm/>
</div>
)}
