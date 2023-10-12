
import { PageContext } from "rakkasjs";
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
  successMessage?: (res: ReturnedError) => string;
  errorMessage?: (res: any) => string;
}
export function handleMutationResponse({
  res,errorMessage,successMessage,
}: THandRolledQueryProps) {
  if (res && "error" in res) {
    toast(errorMessage ? errorMessage(res) : res.error.message, { type: "error", autoClose: false });
  } else {
    toast(successMessage ? successMessage(res) :"mutation success", { type: "success" });

  }
}


/**
 * Fetches data from the API using the specified URL and parameters.
 *
 * @param {PageContext} ctx - The page context object.
 * @param {string} pathname - The API URL pathname.
 * @param {Record<string, any>} params - The parameters to be sent with the API request.
 * @return {Promise<any>} - A promise that resolves to the response data from the API.
 *
 * @example useQueryFetcher(ctx, "/api/project", { user_id: 1, keyword: "test" })
 *
 * The `ctx` is the Rakks app page context object which every use query hook receives as the first parameter.
 * The `pathname` is the API URL pathname. In Rakks, they must all start with "/api".
 * The `params` is the parameters to be sent with the API request.
 */
export async function useQueryFetcher(ctx:PageContext,pathname:string,params:Record<string,any>)
{
  try {
  const api_url = new URL(ctx.url.origin)
    api_url.pathname = pathname;
    Object.entries(params).forEach(([key, value]) => {
      api_url.searchParams.set(key, value);
    });
    return fetch(api_url.toString(), {
    }).then((res) => res.json());
  } catch (error:any) {
    throw {
      error:error,
      message:error.message
    }
  }
}

export async function useMutationFetcher(ctx:PageContext,pathname:string,body:Record<string,any>,
  method:"POST"|"PUT"|"DELETE")
{
  try {
  const api_url = new URL(ctx.url.origin)
    api_url.pathname = pathname;
    return fetch(api_url.toString(), {
      body: JSON.stringify(body),
      method: method,
    }).then((res) => res.json());
  } catch (error:any) {
    throw {
      error:error,
      message:error.message
    }
  }
}
