import { Button } from '@/components/shadcn/ui/button';
import { TJobApplicationInputType, jobApplicationApi } from '@/routes/api/helpers/prisma/job-application';
import { useMutationFetcher } from '@/utils/async';
import Cherry from 'cherry-markdown';
import { Printer, Save } from 'lucide-react';
import { useMutation, usePageContext } from 'rakkasjs';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';


interface coverLetterProps {
  setCoverLetter: (letter: string) => void;
  application_input: TJobApplicationInputType;
  updating?: boolean;
}

export default function CoverLetter({
setCoverLetter,
  application_input,
  updating = false,
}: coverLetterProps) {
  const cherry = useRef<Cherry | null>(null);
  const page_ctx = usePageContext();
  const qc = page_ctx.queryClient;
  const { userId } = qc.getQueryData('user') as LuciaUser;


  const update_job_application_mutation = useMutation<
    Awaited<ReturnType<typeof jobApplicationApi.updateOne>>,
    Partial<TJobApplicationInputType> & { id: string }
  >((vars) => {
    // return jobApplicationApi.updateOne({ input: vars, user_id: userId! });
    return useMutationFetcher(
      page_ctx,
      '/api/job',
      { input: vars, user_id: userId! },
      'PUT',
    );
  });

  useEffect(() => {
    if (!cherry.current) {
      cherry.current = new Cherry({
        id: 'cherry-markdown',
        value: '',
        locale: 'en_US',
      });
    }
  }, []);
  useEffect(() => {
    const html_as_markdwon = cherry.current?.engine.makeMarkdown(
      application_input?.cover_letter,
    );
    if (html_as_markdwon) {
      cherry.current?.setMarkdown(html_as_markdwon);
      // cherry.current?.setMarkdown(html_as_markdwon);
    }
  }, [cherry.current, application_input?.cover_letter]);

  function exportMarkdown() {
    cherry.current?.export('pdf', 'resume.md');
  }

  function setMarkdownToResume() {
    const markdown = cherry.current?.getMarkdown();
    if (!markdown || !application_input?.id) return;
      cherry.current && setCoverLetter(markdown);
    update_job_application_mutation
      .mutateAsync({
        id: application_input?.id ?? '',
        cover_letter: markdown,
        userId: userId!,
      })
      .then((res) => {
        if (res && 'error' in res) {
          toast(`Adding cover letter to Job application failed`, { type: 'error' });
          return;
        }
        toast(`Cover letter added to Job application ${res.id} successfully`, {
          type: 'success',
        });
      });
}

  return (
    <div className="flex flex-col h-full w-full items-center justify-center gap-1">
      <div className="flex w-full gap-2 sticky top-10 z-50 p-1">
        <Button
            size={'sm'}
          className="btn btn-outline btn-sm"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            exportMarkdown();
          }}
        >
          <Printer className="w-6 h-6" />
          print
        </Button>
        <Button
            size={'sm'}
          className="btn btn-outline btn-sm"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMarkdownToResume();
          }}
        >
          <Save className="w-6 h-6" />
          save
        </Button>
      </div>
      {/* <APIs cherry={cherry} /> */}

      <div id="cherry-markdown" />
    </div>
  );
}
