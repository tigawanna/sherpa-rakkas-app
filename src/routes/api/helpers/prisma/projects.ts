import { prisma } from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    name: z.string(),
    description: z.string(),
    repoUrl: z.string(),
    image_url: z.string().optional(),
    languages: z.array(z.string()),
    libraries: z.array(z.string()),
    userId: z.string().optional(),
});

export type TProjectInputType = z.infer<typeof ProjectSchema>;

interface IGetAllProjectsProps {
    userId: string;
}
export async function getAllProjects({ userId }: IGetAllProjectsProps) {
    try {
        return await prisma.project.findMany({
            where: {
                userId,
            },
        });
    } catch (error: any) {

        // if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        //     console.log("=============== PrismaClientUnknownRequestError =============== ", error.message)
        // }
        // if (error instanceof Prisma.PrismaClientKnownRequestError) {

        // }
        return
    }
}

export interface ISearchProjectsProps {
    userId: string;
    keyword: string;
}
export async function searchForProject({
    userId,
    keyword,
}: ISearchProjectsProps) {
    try {
        return await prisma.project.findMany({
            where: {
                userId,
                name: {
                    contains: keyword,
                    mode: "insensitive",
                },
            },
            take: 10,
        });
    } catch (error) {
        // Handle the error
        return
    }
}
export interface IGetProjectByIdProps {
    id: string;
}
export async function getProjectById({ id }: IGetProjectByIdProps) {
    try {
        return await prisma.project.findUnique({ where: { id } });
    } catch (error) {
        // Handle the error
        return
    }
}

export interface IRemoveProjectProps {
    id: string;
}
export async function addNewProject(input: TProjectInputType) {
    try {
        return await prisma.project.create({ data: input });
    } catch (error) {
        // Handle the error
        return
    }
}

export interface IUpdateProjectProps {
    id: string;
    input: TProjectInputType;
}
export async function updateProject(input: TProjectInputType) {
    try {
        return await prisma.project.update({ where: { id: input.id }, data: input });
    } catch (error) {
        // Handle the error
        return
    }
}

export interface IRemoveProjectProps {
    id: string;
    userId: string;
}
export async function removeProject({ id, userId }: IRemoveProjectProps) {
    try {
        return await prisma.project.delete({ where: { id, userId } });
    } catch (error) {
        // Handle the error
        return 
    }
}

export async function removeAllProjects() {
    try {
        return await prisma.project.deleteMany();
    } catch (error) {
        // Handle the error
        return
    }
}


export const projectApi = {
    getAllProjects,
    searchForProject,
    getProjectById,
    addNewProject,
    updateProject,
    removeProject,
    removeAllProjects,
}
