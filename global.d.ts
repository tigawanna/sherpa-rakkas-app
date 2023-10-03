// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./lucia.js").Auth;
    type DatabaseUserAttributes = LuciaUser
    type DatabaseSessionAttributes = {};
}


declare interface LuciaUser{
    username: string;
    email: string
}
