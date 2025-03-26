import { FastifyInstance } from 'fastify'
import { signUp } from '@/http/controllers/users/sign-up'
import { signIn } from '@/http/controllers/users/sign-in'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', signUp)
  app.post('/sign-in', signIn)
}
