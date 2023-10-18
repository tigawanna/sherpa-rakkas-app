import { auth } from '@/lib/auth/lucia/lucia';
import { prisma } from '@/lib/db/prisma';
import { json } from '@hattip/response';
import { RequestContext } from 'rakkasjs';

export async function post(ctx: RequestContext) {
  try {
    const body = await ctx.request.json();
    const user_id = body?.user_id;
    if (!user_id) {
      throw new Error('user_id not found');
    }
    const user = (await auth.getUser(user_id)) as LuciaUser;
    if (!user) {
      throw new Error('user not found');
    }

    if (user?.last_proompted_on) {
      const last_proompted_on = new Date(user.last_proompted_on);
      const last_proompted_on_hour = last_proompted_on.getHours();

      const this_hour= new Date().getHours();
      console.log({last_proompted_on,last_proompted_on_hour, this_hour});

      if (last_proompted_on_hour > this_hour) {
        console.log("TO BE RATE LIMITED");
        return json({
          error: {
            message: `try again in ${last_proompted_on_hour + 3 - this_hour} hours`,
            original_error: new Error(`try again in ${last_proompted_on_hour + 3 - this_hour} hours`),
          },
        });
      } else{
          console.log("WITHIN LIMITS");
        return await updateLastProomptedOn(user_id);
      }
    }
    else {
        console.log("WITHIN LIMITS");
    return await updateLastProomptedOn(user_id);

    }
  } catch (error: any) {
    return json(
      {
        error: {
          message: 'error validating lucia user:' + error.message,
          original_error: error,
        },
      },
      { status: 400 },
    );
  }
}


export async function updateLastProomptedOn(userId:string){
try {
    return prisma.user
        .update({
            where: {
                id:userId,
            },
            data: {
                last_proompted_on: new Date().toString(),
            },
        })
        .then((user) => {
                return json(user, {
                status: 200,
            });
        })
        .catch((error) => {
            throw error
        });
} catch (error) {
    throw error
}
}
