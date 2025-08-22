export interface Feedback {
  name: string;
  description: string;
  rating: number;
}

export interface Feedbacks {
  feedbacks: Feedback[] | [];
}
