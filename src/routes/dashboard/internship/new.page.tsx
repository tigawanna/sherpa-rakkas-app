import { InternshipForm } from "./components/InternshipForm";

interface NewInternshipPageProps {}

export default function NewInternshipPage({}: NewInternshipPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full  items-center justify-center">
        <InternshipForm />
      </div>
    </div>
  );
}
