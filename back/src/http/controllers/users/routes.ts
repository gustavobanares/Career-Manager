import { FastifyInstance } from 'fastify'
import { signUp } from '@/http/controllers/users/sign-up'
import { signIn } from '@/http/controllers/users/sign-in'
import { fetchUser } from './fetch-user'
import { verifyJWT } from '@/middlewares/verify-jwt'
import { saveCv } from './save-cv'

export async function userRoutes(app: FastifyInstance) {
  app.post('/sign-up', signUp)
  app.post('/sign-in', signIn)

  app.get('/user', { onRequest: [verifyJWT] }, fetchUser)
  app.patch('/cv', { onRequest: [verifyJWT] }, saveCv)
}
