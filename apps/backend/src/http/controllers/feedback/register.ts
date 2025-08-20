// src/http/controllers/feedbacks/create.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { CreateFeedbackUseCase } from '../../../use-cases/feedback/register-feedback-user-case.ts';
import { PrismaFeedbackRepository } from '../../../repositories/prisma/prisma-feedbacks-repository.ts';

const createFeedbackBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    rating: z.number(),
});

export async function register(request: FastifyRequest, reply: FastifyReply) {

    const { name, description, rating } = createFeedbackBodySchema.parse(request.body);

    try {
        const prismaFeedbackRepository = new PrismaFeedbackRepository();
        const createFeedbackUseCase = new CreateFeedbackUseCase(prismaFeedbackRepository);
        
        const { feedback } = await createFeedbackUseCase.execute({
            name,
            description,
            rating,
        });

     
        return reply.status(201).send({ feedback });

    } catch (error) {
       
        throw error;
    }
}