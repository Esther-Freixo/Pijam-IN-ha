import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository.ts";
import { AuthenticateUseCase } from "../../../use-cases/users/login-use-case.ts";


export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().optional(),
    username: z.string().optional(),
    password: z.string().min(6),
  }).refine(data => data.email || data.username, {
    message: "É necessário informar email ou username",
  });

  const {
    email,
    username,
    password,

  } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

    const { user } = await authenticateUseCase.execute({
      email,
      username,
      password,
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })

    return reply
      .status(200)
      .send({ token });

  } catch (error) {
    throw new Error
  }

};