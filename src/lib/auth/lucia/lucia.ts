import { prisma } from "@lucia-auth/adapter-prisma";
import { lucia } from "lucia";
import {prisma as client} from "@/lib/db/prisma"
import { web } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";

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
        email,
        githubUsername:username
    }),

});

const {
    RAKKAS_GITHUB_CLIENT_ID: GITHUB_CLIENT_ID,
    RAKKAS_GITHUB_CLIENT_SECRET: GITHUB_CLIENT_SECRET
} = import.meta.env;


export const githubAuth = github(auth, {
    clientId: GITHUB_CLIENT_ID, // env var
    clientSecret: GITHUB_CLIENT_SECRET // env var
});



