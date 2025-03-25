import { FastifyInstance } from 'fastify'
import { fetchJobs } from './fetch-jobs'
import { create } from './create'
import { verifyJWT } from '../../../middlewares/verify-jwt'

export async function jobsRoutes(app: FastifyInstance) {
  app.get('/jobs/fetch', fetchJobs)
  app.post('/jobs', { onRequest: [verifyJWT] }, create)
}
