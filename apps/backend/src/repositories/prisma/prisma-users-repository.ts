import type { UsersRepository, UserUpdateInput } from '../users-repository.ts';
import { prisma } from "../../lib/prisma.ts";
import { Prisma } from "@prisma/client"

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({ data });
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    async findByEmailOrUsername(identifier: string) {
        const lowerCaseIdentifier = identifier.toLowerCase();
        return await prisma.user.findFirst({
            where: {
                OR: [
                    { email: lowerCaseIdentifier },
                    { username: lowerCaseIdentifier }
                ]
            }
        });
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }

    async update(id: string, data: UserUpdateInput) {

        const userExists = await this.findById(id)
        if (!userExists) { return null }


        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: data
        })

        return user
    }

    async delete(id: string) {

        const userExists = await this.findById(id)
        if (!userExists) { return null }

        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })

        return user
    }

    async getALL() {

        const users = await prisma.user.findMany()

        return users

    }
}