import { auth } from "@/lib/auth/lucia/lucia";
import { json } from "@hattip/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RequestContext } from "rakkasjs";



export async function get(ctx: RequestContext) {
return json({ route: "creaet user route" });
}
export async function post(ctx: RequestContext) {
    // return json({ hello: "world" });

    // // Shorthand for:

    // // return new Response(JSON.stringify({ hello: "world" }), {
    // // 	headers: { "content-type": "application/json" },
    // // });

const request = ctx.request;
        const formData = await request.formData();
        const username = formData.get("username");
        const name = formData.get("name");
        const password = formData.get("password");
        // basic check
        if (
            typeof username !== "string" ||
            username.length < 4 ||
            username.length > 31
        ) {
            return new Response("Invalid username", {
                status: 400
            });
        }
        if (
            typeof name !== "string" ||
            username.length < 4 ||
            username.length > 31
        ) {
            return new Response("Invalid name", {
                status: 400
            });
        }
        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255
        ) {
            return new Response("Invalid password", {
                status: 400
            });
        }


        try {
            const user = await auth.createUser({
                key: {
                    providerId: "username", // auth method
                    providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                    password // hashed by Lucia
                },
                attributes: {
                    username,
                    name
                }
            });
            const session = await auth.createSession({
                userId: user.userId,
                attributes: {

                }
            });
            const sessionCookie = auth.createSessionCookie(session);
            // redirect to profile page
            // return new Response(null, {
            //     headers: {
            //         Location: "/",
            //         "Set-Cookie": sessionCookie.serialize() // store session cookie
            //     },
            //     status: 302
            // });
            return json(session, {
                headers: {
                Location: "/",
                "Set-Cookie": sessionCookie.serialize() // store session cookie
                },
            status: 302
                
            })
        } catch (e) {
            // this part depends on the database you're using
            // check for unique constraint error in user table
            if (
                e instanceof PrismaClientKnownRequestError &&
                e.message.includes("Unique constraint failed on the fields")
            ) {
                // return new Response("User exists", {
                //     status: 400
                // });
                
                const target_fields = e?.meta?.target as string[];
                if(target_fields.includes("username")){
                    return json({
                        message: "Username not unique",
                        status: 400,
                        error: e
                    }, {
                        status: 400
                    })
                }
                return json({
                    message: "User not unique",
                    status: 400,
                    error: e
                }, {
                    status: 400
                })
            }
            console.log("error creating user == ", e)
            return new Response("An unknown error occurred", {
                status: 500
            });
        }
    }

