import { z } from "zod";
import { prismaApiWrapper } from "./prismaApiWrapper";

export const JobApplicationSchema = z.object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    job_title: z.string(),
    description: z.string().nullable(),
    job_posting_url: z.string().nullable(),
    projects: z.string().array(),
    cover_letter: z.string(),
    resume: z.string(),
    userId: z.string().nullable(),
    resumeId: z.string().nullable(),
});

export type TJobApplicationInputType = z.infer<typeof JobApplicationSchema>;
export const jobApplicationApi = prismaApiWrapper<TJobApplicationInputType>("jobApplication")
