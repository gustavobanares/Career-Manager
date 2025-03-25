import { FastifyInstance } from 'fastify'
import { signUp } from './sign-up'
import { signIn } from './sign-in'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', signUp)
  app.post('/sign-in', signIn)
}
