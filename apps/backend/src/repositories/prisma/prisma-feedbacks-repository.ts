import type { FeedbacksRepository } from '../feedbacks-repository.ts';
import { prisma } from "../../lib/prisma.ts";
import { Prisma } from "@prisma/client"

export class PrismaFeedbackRepository implements FeedbacksRepository {
    async create(data: Prisma.FeedbackCreateInput) {
        const feedback = await prisma.Feedback.create({ data });
        return feedback;
    }


    async findById(id: string) {
        const feedback = await prisma.feedback.findUnique({
            where: {
                id
            }
        });
        return feedback;
    }



    async delete(id: string) {

        const feedbackExiste = await this.findById(id)
        if (!feedbackExiste) { return null }

        const feedback = await prisma.feedback.delete({
            where: {
                id: id
            }
        })

        return feedback
    }

    async getALL(){

        const users = await prisma.user.findMany()

        return users

    }
}