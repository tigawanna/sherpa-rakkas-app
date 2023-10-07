import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

export const UserProfileSchema = z.object({
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    email: z.string().email(),
    name: z.string(),
    about_me: z.string(),
    github_username: z.string(),
    linkedin_username: z.string(),
    avatar: z.string(),
    country: z.string(),
    city: z.string(),
    phone: z.string(),
    skills:z.string(),
});

export type TUserProfileInputType = z.infer<typeof UserProfileSchema>;

export async function updateUserProfile(userId: string, vars: TUserProfileInputType) {
    try {
        await prisma.user.update({
            where: {
                id:userId,
            },
            data: {
                ...vars,
            },
        });
    } catch (error) {
        throw error;
    }
}
