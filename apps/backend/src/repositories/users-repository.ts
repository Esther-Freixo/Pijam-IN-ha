import { Prisma, type User  } from "@prisma/client";

export interface  UserUpdateInput {
    name?: string,
    email?: string,
    username?: string,
    password?: string,
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findByEmailOrUsername(identifier: string): Promise<User | null>
    update(id: string, data: UserUpdateInput): Promise <User | null>
    delete(id: string): Promise<User | null>
    // getAll():Promise<User[]>
}