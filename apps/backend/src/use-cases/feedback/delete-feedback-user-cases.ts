import { type Feedback } from '@prisma/client';
import type { FeedbacksRepository } from '../../repositories/feedbacks-repository.ts';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error.ts';

interface DeleteFeedbackUseCaseRequest {
    id: string 
}

interface DeleteFeedbackUseCaseResponse {
    feedback: Feedback
}


export class DeleteFeedbackUseCase {
    constructor(private feedbacksRepository: FeedbacksRepository) {}

    async execute({
        id
    }: DeleteFeedbackUseCaseRequest): Promise<DeleteFeedbackUseCaseResponse> {
        const feedback = await this.feedbacksRepository.delete(id);

        if (!feedback) {
            throw new ResourceNotFoundError();
        }

        return { feedback };
    }
}
