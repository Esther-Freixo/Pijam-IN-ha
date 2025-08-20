import type { FastifyInstance } from "fastify";
import { register } from "./register.ts";
import { authenticate } from "./authenticate.ts";
import { update } from "./update.ts";
import { deleteUser } from "./delete.ts";
import { getAllUsers } from "./getAll.ts";


export function userRoutes(app: FastifyInstance) {
    app.post('/authenticate', authenticate)
    app.post('/users', register)
    app.patch('/users/:userId', update)
    app.delete('/users/:userId', deleteUser)
    app.get('/users', getAllUsers)

    
}