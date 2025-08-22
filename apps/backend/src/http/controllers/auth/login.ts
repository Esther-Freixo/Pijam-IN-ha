import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma/prisma-users-repository.ts";
import { AuthenticateUseCase } from "../../../use-cases/users/login-use-case.ts";

export async function loginController(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    identifier: z.string(),
    password: z.string().min(6),
  });

  const { identifier, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    const { user } = await authenticateUseCase.execute({
      email: identifier.includes('@') ? identifier : undefined,
      username: !identifier.includes('@') ? identifier : undefined,
      password,
    });

    const token = await reply.jwtSign({}, {
      sign: { sub: user.id }
    });

    return reply.status(200).send({ token });

  } catch (error) {
    return reply.status(401).send({ message: "Credenciais inválidas" });
  }
}