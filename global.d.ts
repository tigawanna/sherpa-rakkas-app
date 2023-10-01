// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./lucia.js").Auth;
    type DatabaseUserAttributes = {
        username:string;
        email:string;

    };
    type DatabaseSessionAttributes = {};
}


declare interface RakkasResponseError{
    status: number;
    message: string;
    error:any
    
}
