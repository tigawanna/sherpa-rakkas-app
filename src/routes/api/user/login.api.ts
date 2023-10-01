import { auth } from "@/lib/auth/lucia/lucia";
import { signinFormSchema } from "@/lib/auth/schema";
import { json } from "@hattip/response";
import { LuciaError } from "lucia";
import { RequestContext } from "rakkasjs";
import { ZodError } from "zod";

export async function post(ctx: RequestContext) {
    
    const request = ctx.request;
    const formData = await request.formData();
    try {
        const { password,email } = signinFormSchema.parse({
                email: formData.get("email"),
                password: formData.get("password"),
        });
        const key = await auth.useKey("email", email?.toLowerCase(), password);
        const session = await auth.createSession({
                userId: key.userId,
                attributes: {}
            });
            const sessionCookie = auth.createSessionCookie(session);
            return new Response(null, {
                headers: {
                    // Location: "/", // redirect to profile page
                    "Set-Cookie": sessionCookie.serialize() // store session cookie
                },
                status: 302
            });

        
  

    } catch (e) {
        if (e instanceof ZodError){
            return json(e, {
                status: 400
            });
        }
        if (e instanceof LuciaError &&
            (e.message === "AUTH_INVALID_KEY_ID" ||
            e.message === "AUTH_INVALID_PASSWORD"))
            {
            return json(
                {message:"Incorrect email or password",
                error:e
            }, {
                status: 400
            });
        }
    return json(e, {
        status: 400
    })
    }
}
