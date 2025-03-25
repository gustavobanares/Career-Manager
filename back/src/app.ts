import fastify from 'fastify'
import { userRoutes } from './controllers/users/routes'

export const app = fastify()

app.register(userRoutes)
