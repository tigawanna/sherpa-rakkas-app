import { Button } from '@/components/shadcn/ui/button';
import { TJobApplicationInputType, jobApplicationApi } from '@/routes/api/helpers/prisma/job-application';
import { TResumeInputType, resumeApi } from '@/routes/api/helpers/prisma/resume';
import { useMutationFetcher } from '@/utils/async';
import { copytoClipBoard } from '@/utils/helpers/copy-to-clipboard';
import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import { Copy, Printer, Save } from 'lucide-react';
import { useMutation, usePageContext } from 'rakkasjs';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';


interface ResumeEditorProps {
  html_string?: string;
  setResume: (resume: string) => void;
  resume_input?: TResumeInputType;
  application_input: TJobApplicationInputType;
  updating?: boolean;
}

export default function ResumeEditor({
   html_string,setResume,resume_input,application_input,updating=false
  }: ResumeEditorProps) {
  const cherry = useRef<Cherry | null>(null);
  const page_ctx= usePageContext()
  const qc = page_ctx.queryClient
  const { userId } = qc.getQueryData('user') as LuciaUser;

  const create_mutation = useMutation<
    Awaited<ReturnType<typeof resumeApi.addNew>>,
    TResumeInputType
  >((vars) => {
    // return resumeApi.addNew({ input: vars });
      return useMutationFetcher(page_ctx,'/api/resume', { input: vars, user_id: userId! },"POST");
  });

  const update_mutation = useMutation<
    Awaited<ReturnType<typeof resumeApi.updateOne>>,
    TResumeInputType&{id:string}
  >((vars) => {
    // resumeApi.updateOne({ input: vars, user_id: userId! });
    return useMutationFetcher(page_ctx,'/api/resume', { input: vars, user_id: userId! },"PUT");

  });
  
  const update_job_application_mutation = useMutation<
    Awaited<ReturnType<typeof jobApplicationApi.updateOne>>,
    Partial<TJobApplicationInputType> & { id: string }
  >((vars) => {
    // return jobApplicationApi.updateOne({ input: vars, user_id: userId! });
        return useMutationFetcher(page_ctx,'/api/job', { input: vars, user_id: userId! },"PUT");
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
        const html_as_markdwon = cherry.current?.engine.makeMarkdown(html_string);
        if (html_as_markdwon) {
            cherry.current?.setMarkdown(html_as_markdwon);
            // cherry.current?.setMarkdown(html_as_markdwon);
        }
   
    }, [cherry.current,html_string]);


    function exportMarkdown(){
      cherry.current?.export('pdf', 'resume.md');
    }

    function setMarkdownToResume(){
      const markdown = cherry.current?.getMarkdown();
      if(!markdown) return;
      cherry.current&&setResume(markdown);
      if(updating){
        update_mutation.mutateAsync({
          id:resume_input?.id!,
          body: markdown,
          userId: userId!,
          jobAplicationId: application_input.id,
        });
      }
      create_mutation.mutateAsync({
        body:markdown,
        userId:userId!,
        jobAplicationId: application_input.id,
      }).then((res)=>{
          if (res && !('error' in res)) {
            if(res?.id){
            update_job_application_mutation.mutateAsync({
            id:application_input?.id??"",
            resume:res.body,
            resumeId: res?.id,
           })
           .then((res)=>{
            if(res&&"error" in res){
              toast(`Adding Resume to Job application failed`, { type: 'error' });
              return
            }
             toast(`Resume added to Job application ${res.id} successfully`, { type: 'success' });
           })
          }
      
   
          }
        if(res && "error" in res){
        return toast(`Creating Resume  failed`, { type: 'error' });
        }
      }).catch((error)=>{
        toast(`Creating Resume  failed`, { type: 'error' });
      })}

    return (
        <div className="flex min-h-[200px] flex-col h-full w-full items-center justify-center gap-1">
          <div className='flex w-full gap-5 sticky top-10 z-50 p-1'>
            <Button className="btn btn-outline btn-sm" 
              type='button'
              size={'sm'}
             onClick={(e) =>{
              e.stopPropagation();
              exportMarkdown()}}>
              <Printer className="w-6 h-6" />
              print
            </Button>
            
            <Button className="btn btn-outline btn-sm" 
                size={'sm'}
            type='button'
            onClick={(e) =>{
              e.stopPropagation();
              setMarkdownToResume()}}>
              <Save className="w-6 h-6" />
              save
            </Button>

            <Button className="btn btn-outline btn-sm" 
            size={'sm'}
            type='button'
            onClick={(e) =>{
              e.stopPropagation();
                const markdown = cherry.current?.getMarkdown();
                if(markdown){
                  copytoClipBoard(markdown);
                }}
              }>
              <Copy className="w-6 h-6" />
              copy
            </Button>
            
          </div>
            {/* <APIs cherry={cherry} /> */}

            <div id="cherry-markdown" />
        </div>
    );
}
