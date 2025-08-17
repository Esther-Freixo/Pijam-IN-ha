import { PrismaClient } from '@prisma/client';
import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes.ts';
import { ZodError } from 'zod';

export const app = fastify();
export const prisma = new PrismaClient();

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
  credentials: true
})

app.register(userRoutes);

app.setErrorHandler((error, resquest, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: 'Validation error', issues: error.format() })
    }
  
    return reply.status(500).send({ message: "Internal server error" })
  })
