import type { UsersRepository, UserUpdateInput } from '../users-repository.ts';
import { prisma } from './../../app.ts';
import { Prisma } from "@prisma/client";

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
}