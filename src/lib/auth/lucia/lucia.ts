import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import {prisma as client} from "@/lib/db/prisma"
import { web } from "lucia/middleware";

export const auth = lucia({
    env: import.meta.env.DEV?"DEV":"PROD", // "PROD" if deployed to HTTPS
    adapter: prisma(client, {
        user: "user", // model User {}
        key: "key", // model Key {}
        session: "session" // model Session {}
    }),
    middleware: web(),
    sessionCookie: {
        expires: false
    },
    getUserAttributes: ({ id, username,email }) => ({
        userId: id,
        username,
        email
    }),

});


// export async function getLuciaEmailkey(){
//     try {
//         const key = await auth.createKey({
//             userId,
//             providerId: "email",
//             providerUserId: "user@example.com",
//             password: "123456"
//         });
//     } catch (e) {
//         if (e instanceof LuciaError && e.message === "AUTH_DUPLICATE_KEY_ID") {
//             // key already exists
//         }
//         // unexpected database errors
//     }
// }
