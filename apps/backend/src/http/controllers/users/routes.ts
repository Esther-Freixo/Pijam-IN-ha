import type { FastifyInstance } from "fastify";
import { register } from "./register.ts";

export function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    
}