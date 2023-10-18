import { TJobApplicationInputType } from '@/routes/api/helpers/prisma/job-application';
import { TResumeInputType } from '@/routes/api/helpers/prisma/resume';
import ReactDOMServer from 'react-dom/server';
import { ResumeEditor } from './editor/ResumeEditor';
import { SingleViewResumeTemplate } from './resume-templates/SingleViewResumeTemplate';
import { ResumeFields } from './steps/ResumeMutiStepForm';

interface ResumeFormProps {
  resume_fields?: ResumeFields;
  resume_input?: TResumeInputType;
  application_input: TJobApplicationInputType;
  updating?: boolean;
  setResume: (resume: string) => void;
}

export function ResumeForm({
  resume_fields,
  resume_input,
  application_input,
  setResume,
  updating = false,
}: ResumeFormProps) {
  const component_html = resume_fields
    ? ReactDOMServer.renderToString(
        // <SplitViewResumeTemplate resume_fields={resume_fields} />,
        <SingleViewResumeTemplate resume_fields={resume_fields} />,
      )
    : '';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
      <ResumeEditor
        html_string={resume_input?.body ?? component_html}
        setResume={setResume}
        application_input={application_input}
        updating={updating}
        resume_input={resume_input}
      />
    </div>
  );
}
