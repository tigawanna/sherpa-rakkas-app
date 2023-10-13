import { Spinner } from '@/components/navigation/Spinner';
import {
  TJobApplicationInputType,
  jobApplicationApi,
} from '@/routes/api/helpers/prisma/job-application';
import {
  TResumeInputType,
  resumeApi,
} from '@/routes/api/helpers/prisma/resume';
import { narrowOutError } from '@/utils/async';
import { ClientSuspense, useSSQ } from 'rakkasjs';
import { lazy, useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import { SingleViewResumeTemplate } from './resume-templates/SingleViewResumeTemplate';
import { ResumeFields } from './steps/ResumeMutiStepForm';

const ResumeEditor = lazy(
  () => import('@/routes/dashboard/job/components/resume/ResumeEditor'),
);
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
  const component_html =resume_fields? ReactDOMServer.renderToString(
    // <SplitViewResumeTemplate resume_fields={resume_fields} />,
    <SingleViewResumeTemplate resume_fields={resume_fields} />,
  ):""

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-5">
      <ClientSuspense fallback={<Spinner size="100px" />}>
        <ResumeEditor
          html_string={resume_input?.body ?? component_html}
          setResume={setResume}
          application_input={application_input}
          updating={updating}
          resume_input={resume_input}
        />
      </ClientSuspense>
    </div>
  );
}
