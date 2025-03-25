import { makeGetJobUseCase } from '@/use-cases/factories/make-get-job-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getJob(request: FastifyRequest, reply: FastifyReply) {
  const getJobUseCase = makeGetJobUseCase()

  const paramsSchema = z.object({
    jobId: z.string().uuid(),
  })

  const { jobId } = paramsSchema.parse(request.params)

  const { job } = await getJobUseCase.execute({
    jobId,
  })

  return reply.status(200).send({
    job,
  })
}
