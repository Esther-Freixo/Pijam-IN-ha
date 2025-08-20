import { type Feedback } from '@prisma/client';
import type { FeedbacksRepository } from '../../repositories/feedbacks-repository.ts';

interface CreateFeedbackUseCaseRequest {
    name: string;
    description: string;
    rating: number; 
}

interface CreateFeedbackUseCaseResponse {
    feedback: Feedback;
}


export class CreateFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository) {}

    async execute({
        name,
        description,
        rating,
    }: CreateFeedbackUseCaseRequest): Promise<CreateFeedbackUseCaseResponse> {
        const feedback = await this.feedbacksRepository.create({
            name,
            description,
            rating,
        });

        return { feedback };
    }
}
