// src/http/controllers/users/update.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository.ts';
import { GetUsersUseCase } from '../../../use-cases/users/getAll-use-case.ts';


export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {

  const usersRepository = new PrismaUsersRepository();
  const getAllUsersUseCase = new GetUsersUseCase(usersRepository);

  try {
    const { users } = await getAllUsersUseCase.execute();

    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return reply.status(200).send({ users: usersWithoutPassword });

  } catch (err) {
    throw err;
  }
}