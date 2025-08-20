import type { FastifyInstance } from 'fastify'
import { registerController } from './register.ts'
import { loginController } from './login.ts'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/register', registerController)
  app.post('/auth/login', loginController)
}
