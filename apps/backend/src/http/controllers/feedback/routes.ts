import type { FastifyInstance } from "fastify";
import { register } from "./register.ts";
import {deleteFeedback} from './delete.ts'



export function userRoutes(app: FastifyInstance) {
    app.post('/feedbacks', register)
    app.delete('feeedbacks/:feedbackId', deleteFeedback)


}