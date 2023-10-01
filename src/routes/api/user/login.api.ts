import { auth } from "@/lib/auth/lucia/lucia";
import { json } from "@hattip/response";
import { LuciaError } from "lucia";
import { RequestContext } from "rakkasjs";

export async function post(ctx: RequestContext) {
    
    const request = ctx.request;
    const formData = await request.formData();
    const username = formData.get("username");
    const password = formData.get("password");
    // basic check
    if (
        typeof username !== "string" ||
        username.length < 1 ||
        username.length > 31
    ) {
        return new Response("Invalid username", {
            status: 400
        });
    }
    if (
        typeof password !== "string" ||
        password.length < 1 ||
        password.length > 255
    ) {
        return new Response("Invalid password", {
            status: 400
        });
    }
    try {
        // find user by key
        // and validate password
        const key = await auth.useKey("username", username.toLowerCase(), password);
        const session = await auth.createSession({
            userId: key.userId,
            attributes: {}
        });
        const sessionCookie = auth.createSessionCookie(session);
        return new Response(null, {
            headers: {
                Location: "/", // redirect to profile page
                "Set-Cookie": sessionCookie.serialize() // store session cookie
            },
            status: 302
        });
    } catch (e) {
        if (e instanceof LuciaError &&
            (e.message === "AUTH_INVALID_KEY_ID" ||
                e.message === "AUTH_INVALID_PASSWORD")
        ) {
            // user does not exist
            // or invalid password
            return new Response("Incorrect username or password", {
                status: 400
            });
        }
        return new Response("An unknown error occurred", {
            status: 500
        });
    }
}
