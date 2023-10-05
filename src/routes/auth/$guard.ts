import { LookupHookResult, PageContext } from "rakkasjs";

export function pageGuard(ctx: PageContext): LookupHookResult {
  const user = ctx.queryClient.getQueryData("user");
  if (!user) {
    return true;
  } else {
    return {
      redirect: ctx.url.origin,
    };
  }
}
