import { makeFetchJobsHistoryUseCase } from '@/use-cases/factories/make-fetch-jobs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchJobs(request: FastifyRequest, reply: FastifyReply) {
  const fetchJobsHistoryUseCase = await makeFetchJobsHistoryUseCase()

  const { jobs } = await fetchJobsHistoryUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    jobs,
  })
}
