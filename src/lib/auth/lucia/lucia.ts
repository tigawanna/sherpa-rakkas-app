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
    getUserAttributes: ({ id, name, username }) => ({
        userId: id,
        name,
        username
    }),

});
