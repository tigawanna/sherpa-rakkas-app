import { Spinner } from "@/components/navigation/Spinner";
import { TJobApplicationInputType } from "@/routes/api/helpers/prisma/job-application";
import { ClientSuspense } from "rakkasjs";
import { lazy } from "react";
import ReactDOMServer from "react-dom/server";
import { ResumeFields } from "./ResumeMutiStepForm";
import { SingleViewResumeTemplate } from "@/routes/dashboard/job/components/resume/components/resume-templates/SingleViewResumeTemplate";


const ResumeEditor = lazy(() => import('@/routes/dashboard/job/components/resume/components/editor/ResumeEditor'));

interface FinalResumeProps {
    user_id: string;
    resume_fields: ResumeFields;
    application_input: TJobApplicationInputType;
    setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
    setResume: (resume: string) => void;
    handleChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
}

export function FinalResume({resume_fields,setInput,setResume,application_input}:FinalResumeProps){
const component_html = ReactDOMServer.renderToString(
  // <SplitViewResumeTemplate resume_fields={resume_fields} />,
  <SingleViewResumeTemplate resume_fields={resume_fields} />,
);
// console.log('input inside finally resume', application_input);
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
    {/* <ResumeTemplate resume={input}/> */}
    <ClientSuspense fallback={<Spinner size="100px"/>}>
       <ResumeEditor 
       html_string={component_html} 
       setResume={setResume} 
       application_input={application_input}
       /> <br />
    </ClientSuspense>
    {/* <ResumePartsContainer resume_fields={resume_fields} /> */}
    {/* <ResumeTemplatesTab resume_fields={resume_fields}/> */}

 </div>
);
}
