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
