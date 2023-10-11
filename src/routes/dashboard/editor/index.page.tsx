import { Spinner } from "@/components/navigation/Spinner"
import { ClientSuspense, PageProps } from "rakkasjs"

export default function Page({}:PageProps) {
return (
<div className="w-full h-full flex items-center justify-center">
<ClientSuspense fallback={<Spinner size="100px"/>}>
    {/* <ResumeEditor /> */}
</ClientSuspense>
</div>
)}
