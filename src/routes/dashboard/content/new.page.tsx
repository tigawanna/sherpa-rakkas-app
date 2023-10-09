import { ContentForm } from "./components/ContentForm";

export default function NewContentPage({}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-2">
      <div className="flex h-full w-full items-center justify-center">
        <ContentForm />
      </div>
    </div>
  );
}
