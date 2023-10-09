import { HackathonForm } from "./components/HackathonForm";


interface NewHackathonPageProps {}

export default function NewHackathonPage({}: NewHackathonPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
         <h1 className="text-2xl font-bold">Add Hackathon</h1>
      <div className="flex h-full w-full items-center justify-center">
        <HackathonForm />
      </div>
    </div>
  );
}
