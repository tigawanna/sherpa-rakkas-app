import { auth } from "@/lib/auth/lucia/lucia";
import { signupFormSchema } from "@/lib/auth/schema";
import { json } from "@hattip/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { RequestContext } from "rakkasjs";
import { ZodError } from "zod";

export async function get(ctx: RequestContext) {
  return json({ route: "creaet user route" });
}
export async function post(ctx: RequestContext) {
  const request = ctx.request;
  const formData = await request.formData();
  try {
      const { password, email, username } = signupFormSchema.parse(
          {
              username: formData.get("username"),
              email: formData.get("email"),
              password: formData.get("password"),
          },
          {}
      );
    const user = await auth.createUser({
      key: {
        providerId: "email", // auth method
        providerUserId: email.toLowerCase(), // unique id when using "username" auth method
        password, // hashed by Lucia
      },
      attributes: {
        username,
        email,
      },
    });
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);

    return json(session, {
      headers: {
        // Location: "/",
        "Set-Cookie": sessionCookie.serialize(), // store session cookie
      },
      status: 302,
    });
  } catch (e:any) {
    // this part depends on the database you're using
    // check for unique constraint error in user table
      if (e instanceof ZodError) {
          // Access individual field errors
          const fieldErrors = e.errors.map((err) => {
              return {
                  field: err.path.join('.'),
                  message: err.message,
              };
          });

          // Return the field errors as an API response
          return new Response(
              JSON.stringify({ errors: fieldErrors }),
              {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
              }
          );
      }

    if (
      e instanceof PrismaClientKnownRequestError &&
      e.message.includes("Unique constraint failed on the fields")
    ) {
      // return new Response("User exists", {
      //     status: 400
      // });

      const target_fields = e?.meta?.target as string[];
      if (target_fields.includes("username")) {
        return json(
          {
            message: "Username not unique",
            error: e,
          },
          {
            status: 400,
          }
        );
      }
      if (target_fields.includes("email")) {
        return json(
          {
            message: "Email not unique",
            error: e,
          },
          {
            status: 400,
          }
        );
      }
      return json(
        {
          message: "User not unique",
          error: e,
        },
        {
          status: 400,
        }
      );
    }

    return json({
      measage: "Something went wrong "+e.message,
      error: e
    },{
      status: 500
    })
  }
}
