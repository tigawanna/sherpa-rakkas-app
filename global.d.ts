// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./lucia.js").Auth;
    type DatabaseUserAttributes = LuciaUser
    type DatabaseSessionAttributes = {};
}


declare interface LuciaUser{
    username: string;
    email: string;
    name?:string;
    avatar?: string;
    about_me?: string;
    github_username?: string;
    linkedin_username?: string;
     country?: string;
    city?: string;
    phone?: string;
    skills?: string;
}
