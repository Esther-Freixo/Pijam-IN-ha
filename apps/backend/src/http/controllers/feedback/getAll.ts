
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaFeedbackRepository } from '../../../repositories/prisma/prisma-feedbacks-repository.ts';
import { GetFeedbacksUseCase } from '../../../use-cases/feedback/getAll-feedback-user-cases.ts';


export async function getAllFeedbacks(request: FastifyRequest, reply: FastifyReply) {

    const feedbackRepository = new PrismaFeedbackRepository();
    const getAllFeedbacksUseCase = new GetFeedbacksUseCase(feedbackRepository);

    try {
        const { feedbacks } = await getAllFeedbacksUseCase.execute();


        return reply.status(200).send({ feedbacks });

    } catch (err) {
        throw err;
    }
}