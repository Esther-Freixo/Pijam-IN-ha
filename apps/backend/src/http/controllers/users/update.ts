import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts';
import { PrismaUsersRepository } from '../../../repositories/prisma/prisma-users-repository.ts';
import { UpdateUserUseCase } from '../../../use-cases/users/update-user-use-case.ts';


const updateUserBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  username: z.string().optional(),
  password: z.string().min(6).optional(),
});


const updateUserParamsSchema = z.object({
  userId: z.string().uuid(), 
});

export async function update(request: FastifyRequest, reply: FastifyReply) {
  
  const { userId } = updateUserParamsSchema.parse(request.params);
  const { name, email, username, password } = updateUserBodySchema.parse(request.body);

  
  const usersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  try {
 
    const { user } = await updateUserUseCase.execute({
      id: userId,
      data: { name, email, username, password },
    });

   
    return reply.status(200).send({
      message: 'User updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });

  } catch (err) {
  
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

  
    throw err;
  }
}