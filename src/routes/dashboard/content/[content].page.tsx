import { PageProps, useQueryClient, useSSQ } from "rakkasjs";
import { ContentForm } from "./components/ContentForm";
import { contentApi } from "@/routes/api/helpers/prisma/content";
import { ReturnedUseQueryEror } from "@/components/error/ReturnedUseQueryEror";

export default function ContentPage({params}:PageProps) {
    const qc = useQueryClient();
    const user = qc.getQueryData("user") as LuciaUser;
    const content_id = params.content as string;

    const query = useSSQ((ctx) => {
      return contentApi.getOne({
        item_id: content_id,
        user_id: user?.userId!,
      });
    });

    if (query.error || (query.data && "error" in query.data)) {
      return <ReturnedUseQueryEror data={query.data} error={query.error} />;
    }

  if (!query.data) {
    return (
      <div className="flex h-full  w-full items-center justify-center p-2">
        <div className="rounded-lg border p-2 text-3xl text-warning">
          no matches found
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-full items-center justify-center">
        <ContentForm default_value={query.data} updating={true} />
      </div>
    </div>
  );
}


