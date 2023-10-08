import { HackathonForm } from "../components/hackathons/HackathonForm";


interface NewHackathonPageProps {}

export default function NewHackathonPage({}: NewHackathonPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
      <h1 className="text-3xl font-bold">Hackathon Form</h1>
      <div className="flex h-full w-full items-center justify-center">
        <HackathonForm />
      </div>
    </div>
  );
}
