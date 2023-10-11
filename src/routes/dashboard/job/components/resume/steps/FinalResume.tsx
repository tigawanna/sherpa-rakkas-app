import { Spinner } from "@/components/navigation/Spinner";
import { TJobApplicationInputType } from "@/routes/api/helpers/prisma/job-application";
import { ClientSuspense } from "rakkasjs";
import ReactDOMServer from "react-dom/server";
import { ResumeFields } from "./ResumeMutiStepForm";
import { ResumePartsContainer } from './compoents/resume-parts/ResumePartsContainer';
import { lazy } from "react";
import { ResumeTemplatesTab } from "./compoents/resume-templates/ResumeTemplatesTab";

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

  const component_html = ReactDOMServer.renderToString(<ResumePartsContainer resume_fields={resume_fields} />);
return (
 <div className='w-full h-full flex items-center justify-center'>
    {/* <ResumeTemplate resume={input}/> */}
    {/* <ClientSuspense fallback={<Spinner size="100px"/>}>
       <ResumeEditor html_string={component_html} setResume={setResume}/> <br />
    </ClientSuspense> */}
    {/* <ResumePartsContainer resume_fields={resume_fields} /> */}
    <ResumeTemplatesTab resume_fields={resume_fields}/>

 </div>
);
}
