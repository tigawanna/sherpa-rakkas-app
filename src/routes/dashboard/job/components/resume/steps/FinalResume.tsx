import { ResumeFields } from "./ResumeMutiStepForm";
import { ResumeTemplate } from "./compoents/ResumeTemplate";

interface FinalResumeProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  setResume:(resume: string) => void;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function FinalResume({input,setInput}:FinalResumeProps){
  
return (
 <div className='w-full h-full flex items-center justify-center'>
    <ResumeTemplate resume={input}/>
 </div>
);
}
