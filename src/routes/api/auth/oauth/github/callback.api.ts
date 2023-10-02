import { auth, githubAuth } from "@/lib/auth/lucia/lucia";
import { json } from "@hattip/response";
import { RequestContext } from "lucia";
import { parseCookie } from "lucia/utils";


export async function get(ctx: RequestContext) {
    const request = ctx.request;
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");
    const storedState = cookies.github_oauth_state;
    const url = new URL(request.url!);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");

    // console.log({storedState,state,code})
    // validate state
    if (!storedState || !state || storedState !== state || !code) {
        return json({
            error: "Invalid state",
            message: `Invalid state : ${storedState}, ${state}, ${code}`,
        }, {
            status: 400
        })
    }
    try {
        const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);

        const getUser = async () => {
            const existingUser = await getExistingUser();
            if (existingUser) return existingUser;
            const user = await createUser({
                attributes: {
                    username: githubUser.login,
                    email: githubUser.email!,
                    }
            });
            return user;
        };

        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });
        const sessionCookie = auth.createSessionCookie(session);
        console.log({session})
        return json(session, {
            headers: {
                Location: "/",
                "Set-Cookie": sessionCookie.serialize() // store session cookie
            },
            status: 302
        })

    } catch (e) {
        console.log({errorr:e})
        if (e instanceof Error) {
            // invalid code
        return json(e, {
            status: 400
        })
        }

        return json(e, {
            status: 500
        })
    }
}
