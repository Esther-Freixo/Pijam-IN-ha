import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { userRoutes } from './http/controllers/users/routes.ts';
import { pajamasRoutes } from './http/controllers/pajamas/routes.ts';
import { ZodError } from 'zod';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { env } from './env/index.ts';

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
  credentials: true
})

app.register(fastifyJwt, { secret: env.JWT_SECRET });


// registra as outras routes
app.register(userRoutes);
app.register(pajamasRoutes);

app.setErrorHandler((error, resquest, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: 'Validation error', issues: error.format() })
    }
    
  
    return reply.status(500).send({ message: "Internal server error" })
  })
