import { PageProps, usePageContext } from "rakkasjs"
export default function Page({}:PageProps) {
const page_ctx  = usePageContext()
const user = page_ctx.queryClient.getQueryData("user") as LuciaUser
return (
<div className="w-full flex-col h-full flex items-center justify-center min-h-screen">
       <h2>Test Page</h2>
<div className="w-full h-full flex items-center justify-center text-4xl">
{user ? (
<div className="w-full h-full flex items-center justify-center">
<h1>{user?.email}</h1>
</div>
) : (
<div className="w-full h-full flex items-center justify-center">
<h1>No User</h1>
</div>
)}
</div>
</div>
)}
