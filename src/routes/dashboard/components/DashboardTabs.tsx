import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/shadcn/ui/tabs";
import Project from "../project/index.page";

interface DashboardTabsProps {

}

export function DashboardTabs({}:DashboardTabsProps){
return (
  <div className="w-full h-full flex items-center justify-center">
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full flex gap-1">
        <TabsTrigger value="project" className="w-full">Project</TabsTrigger>
        <TabsTrigger value="password" className="w-full">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="project">
        <Project/>
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  </div>
);
}
