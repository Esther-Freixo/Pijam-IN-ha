import type { FastifyInstance } from "fastify";
import { register } from "./register.ts";
import { authenticate } from "./authenticate.ts";

export function userRoutes(app: FastifyInstance) {
    app.post('/authenticate', authenticate)
    app.post('/users', register)

    
}