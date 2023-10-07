import { RequestContext } from "rakkasjs";
import { loginUserWithEmailandPassword } from "../helpers/auth-methods";

export async function post(ctx: RequestContext) {
  return await loginUserWithEmailandPassword(ctx);
}
