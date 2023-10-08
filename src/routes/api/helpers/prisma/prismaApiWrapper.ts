// @ts-nocheck
import { prisma } from "@/lib/db/prisma";

export function prismaApiWrapper<T>(model: keyof typeof prisma) {

  const api = {
      getAll: async ({ user_id }: { user_id: string }) => {
        try{
          return await prisma[model]?.findMany({ where: { userId: user_id } }) as T[]
        } catch (error: any) {
          console.log("error getting all \n VARS ===== ", { item_id, user_id })
          console.log("===== ERROR mESSAGE======", error.message);
          console.log("==== FULL ERROR ======", error);
          return {
            error: {
              message: error.message,
              original_error: error,
            },
          };
        }

    },
    getOne: async({ item_id, user_id }: { item_id: string; user_id: string})=> {
      try{
        return await prisma[model]?.findUnique({
          where: { id: item_id, userId: user_id },
        }) as T
      } catch (error: any) {
        console.log("error getting one \n VARS ===== ", { item_id, user_id })
        console.log("===== ERROR mESSAGE======", error.message);
        console.log("==== FULL ERROR ======", error);
        return {
          error: {
            message: error.message,
            original_error: error,
          },
        };
      }
    },

        addNew: async ({ input }: { input: T })=> {
          try{
            return await prisma[model]?.create({ data: input }) as T
          } catch (error: any) {
            console.log("error adding new \n VARS ===== ", { input })
            console.log("===== ERROR mESSAGE======", error.message);
            console.log("==== FULL ERROR ======", error);
            return {
              error: {
                message: error.message,
                original_error: error,
              },
            };
          }
    },

    updateOne: async ({ input, user_id }: { input: T; user_id: string }) => {
      try{
        return await prisma[model]?.update({
          where: { id: input.id, userId: user_id },
          data: input,
        }) as T

      } catch (error: any) {
        console.log("error updating \n VARS ===== ", { item_id, user_id })
        console.log("===== ERROR mESSAGE======", error.message);
        console.log("==== FULL ERROR ======", error);
        return {
          error: {
            message: error.message,
            original_error: error,
          },
        };
      }
    },

    removeOne: async({ item_id, user_id }: { item_id: string; user_id: string }) => {
      try{
        return await prisma[model]?.delete({
          where: { id: item_id, userId: user_id },
        }) as T
      } catch (error: any) {
        console.log("error removing one \n VARS ===== ",{ item_id, user_id })
        console.log("===== ERROR mESSAGE======", error.message);
        console.log("==== FULL ERROR ======",error);
        
        return {
          error: {
            message: error.message,
            original_error: error,
          },
        };
      }

    },

      removeAll: async ({ user_id }: { user_id: string }) => {
        try{
          return await prisma[model]?.deleteMany({
            where: { userId: user_id },
          }) as Prisma.PrismaPromise<Prisma.BatchPayload>
        } catch (error: any) {
          console.log("error removing all \n VARS ===== ", { user_id })
          console.log("===== ERROR mESSAGE======", error.message);
          console.log("==== FULL ERROR ======", error);
          return {
            error: {
              message: error.message,
              original_error: error,
            },
          };
        }

    },
  };
  return api;
}
