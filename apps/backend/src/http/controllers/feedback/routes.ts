import type { FastifyInstance } from "fastify";
import { register } from "./register.ts";
import {deleteFeedback} from './delete.ts'
import { getAllFeedbacks } from "./getAll.ts";



export function feedbackRoutes(app: FastifyInstance) {
    app.post('/feedbacks', register)
    app.delete('/feeedbacks/:feedbackId', deleteFeedback)
    app.get('/feedbacks', getAllFeedbacks)
}