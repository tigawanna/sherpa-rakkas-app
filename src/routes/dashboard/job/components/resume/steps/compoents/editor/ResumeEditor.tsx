import { useFormHook } from '@/components/form/useForm';
import { Button } from '@/components/shadcn/ui/button';
import { TJobApplicationInputType, jobApplicationApi } from '@/routes/api/helpers/prisma/job-application';
import { TResumeInputType, resumeApi } from '@/routes/api/helpers/prisma/resume';
import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import { Printer, Save } from 'lucide-react';
import { useQueryClient, useSSM } from 'rakkasjs';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';


interface ResumeEditorProps {
  html_string?: string;
  setResume: (resume: string) => void;
  default_value?: TResumeInputType;
  application_input: TJobApplicationInputType;
  updating?: boolean;
}

export default function ResumeEditor({ html_string,setResume,default_value,application_input,updating=false }: ResumeEditorProps) {
  const cherry = useRef<Cherry | null>(null);
  const qc = useQueryClient();
  const { userId } = qc.getQueryData('user') as LuciaUser;

  const create_mutation = useSSM<
    Awaited<ReturnType<typeof resumeApi.addNew>>,
    TResumeInputType
  >((ctx, vars) => {
    return resumeApi.addNew({ input: vars });
  });

  const update_mutation = useSSM<
    Awaited<ReturnType<typeof resumeApi.updateOne>>,
    TResumeInputType&{id:string}
  >((ctx, vars) => {
    return resumeApi.updateOne({ input: vars, user_id: userId! });
  });
  const update_job_application_mutation = useSSM<
    Awaited<ReturnType<typeof jobApplicationApi.updateOne>>,
    Partial<TJobApplicationInputType> & { id: string }
  >((ctx, vars) => {
    return jobApplicationApi.updateOne({ input: vars, user_id: userId! });
  });

  const { handleChange, input, setError, setInput, validateInputs } =
    useFormHook<TResumeInputType>({
      initialValues: {
        id: default_value?.id,
        userId: default_value?.userId ?? userId!,
        body: default_value?.body ?? '',
        jobAplicationId: default_value?.id ?? (application_input.id as string),
      },
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
          id:default_value?.id!,
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
            resume:res.body,
            resumeId: res?.id,
           }).then((res)=>{
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
      })



    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
          <div className='flex w-full gap-2 sticky top-10 z-50 p-1'>
            <Button className="btn btn-outline btn-sm" 
              type='button'
            onClick={(e) =>{
              e.stopPropagation();
              exportMarkdown()}}>
              <Printer className="w-6 h-6" />
              print
            </Button>
            <Button className="btn btn-outline btn-sm" 
            type='button'
            onClick={(e) =>{
              e.stopPropagation();
              setMarkdownToResume()}}>
              <Save className="w-6 h-6" />
              save
            </Button>
          </div>
            {/* <APIs cherry={cherry} /> */}

            <div id="cherry-markdown" />
        </div>
    );
}
