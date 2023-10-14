import {  useQueryFetcher } from '@/utils/async';
import { PageContext, useQuery } from 'rakkasjs';

interface ProfileStatsCardsProps {
  model: string;
  user_id: string;
  page_ctx: PageContext;
}

export function ProfileStatsCards({
  model,
  user_id,
  page_ctx,
}: ProfileStatsCardsProps) {
  const query = useQuery('count' + model + user_id, () => {
    return useQueryFetcher(page_ctx, '/api/count', { model, user_id });
  });

  const data = query?.data;

  if (data && data?.error) {
    return null;
  }
  return (
    <div
      className="flex w-full flex-col justify-center gap-1 rounded-md border shadow-sm
      shadow-accent hover:border-accent sm:w-[45%] lg:w-[30%] p-2"
    >
      <div className="w-full h-full flex justify-between">
        <h3>{model}</h3>
        <div className="text-lg font-bold border-2 border-accent w-10 h-10 rounded-full flex items-center justify-center aspect-square p-2">
          {data}
        </div>
      </div>
    </div>
  );
}
