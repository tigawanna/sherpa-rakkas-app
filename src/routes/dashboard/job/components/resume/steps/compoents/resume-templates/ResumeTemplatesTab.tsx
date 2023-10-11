import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs";
import { ResumeFields } from "../../ResumeMutiStepForm";
import { SingleViewResumeTemplate } from "./SingleViewResumeTemplate";
import { SplitViewResumeTemplate } from "./SplitViewResumeTemplate";


interface ResumeTemplatesTabProps {
  resume_fields: ResumeFields;
}

export function ResumeTemplatesTab({resume_fields}:ResumeTemplatesTabProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Tabs defaultValue="account" className="w-full h-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="single">Single View</TabsTrigger>
        <TabsTrigger value="split">Split View</TabsTrigger>
      </TabsList>
      <TabsContent value="single">
        <SingleViewResumeTemplate resume_fields={resume_fields}/>
      </TabsContent>
      <TabsContent value="split">
    <SplitViewResumeTemplate resume_fields={resume_fields}/>
      </TabsContent>
    </Tabs>
 </div>
);
}
