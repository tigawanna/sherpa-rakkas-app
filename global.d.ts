// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./lucia.js").Auth;
    type DatabaseUserAttributes = {
        name:string;
        username:string;
    };
    type DatabaseSessionAttributes = {};
}


declare interface RakkasResponseError{
    status: number;
    message: string;
    error:any
    
}
