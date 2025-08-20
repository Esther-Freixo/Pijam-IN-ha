import { Prisma, type Feedback } from '@prisma/client';

export interface FeedbacksRepository {
    create(data: Prisma.FeedbackCreateInput): Promise<Feedback>;
    delete(id: string): Promise<Feedback | null>
    getAll():Promise<Feedback[]>
    
}