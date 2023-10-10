import { PageProps } from "rakkasjs"
export default function JobApplicationPage({params}:PageProps) {
const job_id  = params.job as string    
return (
<div className="w-full h-full flex items-center justify-center">
 Job Application {job_id}
</div>
)}
