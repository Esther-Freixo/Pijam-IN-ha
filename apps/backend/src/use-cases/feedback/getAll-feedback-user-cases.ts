import { type FeedbacksRepository } from "../../repositories/feedbacks-repository.ts";
import { type Feedback } from "@prisma/client";

interface GetFeedbacksUseCaseResponse {
  feedbacks: Feedback[];
}

export class GetFeedbacksUseCase {
  constructor(private readonly feedbacksRepository: FeedbacksRepository) {}

  async execute(): Promise<GetFeedbacksUseCaseResponse> {
    const feedbacks = await this.feedbacksRepository.getAll();

    return { feedbacks };
  }
}
