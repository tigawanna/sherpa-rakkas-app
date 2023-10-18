// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./lucia.js").Auth;
    type DatabaseUserAttributes = LuciaUser
    type DatabaseSessionAttributes = {};
}


declare interface LuciaUser{
    userId?: string;
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
    last_resume_on?:string
    last_letter_on?:string
}

declare class CustomError extends Error {
    constructor(message: string, fields?: Record<string, any>) {
        super(message);
        this.name = "CustomError";
        this.fields = fields;
    }
}

declare interface ReturnedError {
    error: {
        message: string;
        original_error: string,

    }
}

