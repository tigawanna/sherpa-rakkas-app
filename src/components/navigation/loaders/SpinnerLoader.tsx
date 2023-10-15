import { Loader } from "lucide-react";
import { cn } from "../../shadcn/lib/utils";

interface SpinnerLoaderProps {
className?:string
size?:string
}

export function SpinnerLoader({className,size}:SpinnerLoaderProps){
  
return (
    <div className={cn("w-full flex items-center justify-center",className)}>
      <Loader className={cn("animate-spin",size)}/>
    </div>
);
}
