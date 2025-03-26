import { FastifyInstance } from 'fastify'
import { signUp } from '@/http/controllers/users/sign-up'
import { signIn } from '@/http/controllers/users/sign-in'
import { fetchUser } from './fetch-user'
import { verifyJWT } from '@/middlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.get('/user', { onRequest: [verifyJWT] }, fetchUser)
  app.post('/sign-up', signUp)
  app.post('/sign-in', signIn)
}
