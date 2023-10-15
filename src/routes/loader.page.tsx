import { SkeletonLoader } from "@/components/navigation/loaders/SkeletonLoader"
import { PageProps } from "rakkasjs"
export default function Page({}:PageProps) {
return (
<div className="w-full h-full min-h-screen flex items-center justify-between">
<SkeletonLoader/>
</div>
)}
