import { FastifyInstance } from 'fastify'
import { fetchJobs } from './fetch-jobs'

export async function jobsRoutes(app: FastifyInstance) {
  app.get('/jobs/fetch', fetchJobs)
}
