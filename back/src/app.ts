import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { userRoutes } from './http/controllers/users/routes'
import { env } from './env'
import { jobsRoutes } from './http/controllers/jobs/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(userRoutes)
app.register(jobsRoutes)
