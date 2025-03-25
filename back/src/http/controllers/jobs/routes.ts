import { FastifyInstance } from 'fastify'
import { fetchJobs } from './fetch-jobs'
import { create } from './create'
import { verifyJWT } from '../../../middlewares/verify-jwt'
import { getJob } from './get'
import { deleteJob } from './delete'

export async function jobsRoutes(app: FastifyInstance) {
  app.get('/jobs/fetch', fetchJobs)
  app.get('/jobs/:jobId', { onRequest: [verifyJWT] }, getJob)

  app.post('/jobs', { onRequest: [verifyJWT] }, create)
  app.post('/jobs/:jobId', { onRequest: [verifyJWT] }, deleteJob)
}
