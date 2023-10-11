import { TJobApplicationInputType } from "@/routes/api/helpers/prisma/job-application";
import ReactDOMServer from "react-dom/server";
import { ResumeFields } from "./ResumeMutiStepForm";
import { lazy } from "react";
import { ResumeTemplatesTab } from "./compoents/resume-templates/ResumeTemplatesTab";
import { SingleViewResumeTemplate } from "./compoents/resume-templates/SingleViewResumeTemplate";
import { Spinner } from "@/components/navigation/Spinner";
import { ClientSuspense } from "rakkasjs";


const ResumeEditor = lazy(() => import('./compoents/editor/ResumeEditor'));

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
const component_html = ReactDOMServer.renderToString(<SingleViewResumeTemplate resume_fields={resume_fields} />);
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
    <ResumeTemplatesTab resume_fields={resume_fields}/>

 </div>
);
}
