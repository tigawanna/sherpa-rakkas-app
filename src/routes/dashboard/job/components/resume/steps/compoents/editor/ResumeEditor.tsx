import { Button } from '@/components/shadcn/ui/button';
import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import { Printer, Save } from 'lucide-react';
import { lazy, useEffect, useRef } from 'react';

interface ResumeEditorProps {
    html_string?: string;
    setResume: (resume: string) => void;
}

export default function ResumeEditor({ html_string,setResume }: ResumeEditorProps) {
    const cherry = useRef<Cherry | null>(null);


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
        }
   
    }, [cherry.current,html_string]);


    function exportMarkdown(){
      cherry.current?.export('pdf', 'resume.md');
    }

    function setMarkdownToResume(){
      cherry.current&&setResume(cherry.current?.getMarkdown());
    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
          <div className='flex w-full gap-2 sticky top-10 z-50'>
            <Button onClick={() =>exportMarkdown()}>
              <Printer className="w-6 h-6" />
            </Button>
            <Button onClick={() =>setMarkdownToResume()}>
              <Save className="w-6 h-6" />
            </Button>
          </div>
            {/* <APIs cherry={cherry} /> */}

            <div id="cherry-markdown" />
        </div>
    );
}


