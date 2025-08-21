import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { DeleteUserUseCase } from '../../../use-cases/users/delete-use-case.ts';
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository.ts';
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts';


const deleteUserParamsSchema  = z.object({
  userId: z.string().uuid()
});



export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  
  const { userId } = deleteUserParamsSchema.parse(request.params);


  
  const usersRepository = new PrismaUsersRepository();
  const deleteUserUseCase  = new DeleteUserUseCase(usersRepository);

  try {
    await deleteUserUseCase.execute({ id: userId });

    return reply.status(204).send();

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}