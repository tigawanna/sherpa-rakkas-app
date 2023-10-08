import { QueryClient } from "rakkasjs";
import { toast } from "react-toastify";

export async function artificialDelay(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
}

export function isLinkCurrentPathname(path: string, url: URL | string) {
  if (typeof url === "string") {
    url = new URL(url);
  }
  if (path === url.pathname) {
    return true;
  }
  return false;
}

interface THandRolledQueryProps {
  res: any | ReturnedError;
  qc: QueryClient;
  query_key: string;
  successMessage?: (res: ReturnedError) => string;
  errorMessage?: (res: any) => string;
}
export function handleMutationResponse({
  res,
  qc,
  query_key,
  errorMessage,
  successMessage,
}: THandRolledQueryProps) {
  if (res && "error" in res) {
    toast(errorMessage ? errorMessage(res) : res.error.message, { type: "error", autoClose: false });
  } else {
    toast(successMessage ? successMessage(res) : query_key + "mutation success", { type: "success" });
    qc.invalidateQueries(query_key);
  }
}
