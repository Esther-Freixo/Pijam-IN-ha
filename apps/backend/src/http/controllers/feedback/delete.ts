// src/http/controllers/feedbacks/create.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { DeleteFeedbackUseCase } from '../../../use-cases/feedback/delete-feedback-user-cases.ts';
import { PrismaFeedbackRepository } from '../../../repositories/prisma/prisma-feedbacks-repository.ts';
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts';

const deleteFeedbackBodySchema = z.object({
    feedbackId: z.string().uuid()
});

export async function deleteFeedback(request: FastifyRequest, reply: FastifyReply) {
  
  const { feedbackId } = deleteFeedbackBodySchema.parse(request.params);


  
  const feedbacksRepository = new PrismaFeedbackRepository();
  const deleteFeedbackUseCase  = new DeleteFeedbackUseCase(feedbacksRepository);

  try {
    await deleteFeedbackUseCase.execute({ id: feedbackId });

    return reply.status(204).send();

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
}