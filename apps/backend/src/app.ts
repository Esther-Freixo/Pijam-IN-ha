import { PrismaClient } from '@prisma/client';
import fastify from 'fastify';
import { userRoutes } from './http/controllers/users/routes.ts';
import { salesRoutes } from './http/controllers/sales/routes.ts';
import { ZodError } from 'zod';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { env } from './env/index.ts';
import { authRoutes } from './http/controllers/auth/routes.ts';
import { feedbackRoutes } from './http/controllers/feedback/routes.ts';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { pijamaRoutes } from './http/controllers/pajamas/routes.ts';

export const app = fastify();
export const prisma = new PrismaClient();

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization'],
  credentials: true
})

app.register(fastifyJwt, { secret: env.JWT_SECRET });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Pijaminha API',
      version: '1.0.0',
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

// registra as outras routes
app.register(authRoutes)
app.register(userRoutes);
app.register(pijamaRoutes);
app.register(salesRoutes);
app.register(feedbackRoutes);

app.setErrorHandler((error, resquest, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: 'Validation error', issues: error.format() })
    }
    
  
    return reply.status(500).send({ message: "Internal server error" })
  })
