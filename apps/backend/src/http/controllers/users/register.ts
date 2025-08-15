import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { RegisterUseCase } from '../../../use-cases/users/register-user-use-case.ts';
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository.ts";
import { UserAlreadyExists } from "../../../errors/user-already-exists-error.ts";


export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        username: z.string(),
        password: z.string().min(6),
    });

    const {
        name,
        email,
        username,
        password,
    } = registerBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        await registerUseCase.execute({
            name,
            email,
            username,
            password,
        })
    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: error.message })
        }
        throw new Error
    }

    return reply.status(201).send('Usuário criado com sucesso');
};