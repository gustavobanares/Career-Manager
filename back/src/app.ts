import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from './http/controllers/users/routes'
import { env } from './env'
import { jobsRoutes } from './http/controllers/jobs/routes'
import fastifyCors from '@fastify/cors'
import { ZodError } from 'zod'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
})

app.register(userRoutes)
app.register(jobsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
