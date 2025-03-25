import { makeUpdateJobUseCase } from '@/use-cases/factories/make-update-job-use-case'
import { JobStatus } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateJob(request: FastifyRequest, reply: FastifyReply) {
  const updateJobUseCase = makeUpdateJobUseCase()

  const paramsSchema = z.object({
    jobId: z.string().uuid(),
  })

  const bodySchema = z.object({
    companyName: z.string().optional(),
    application_status: z.nativeEnum(JobStatus).optional(),
    description: z.string().optional(),
    feedback: z.string().optional(),
    link: z.string().optional(),
  })

  const { jobId } = paramsSchema.parse(request.params)
  const body = bodySchema.parse(request.body)

  const { job } = await updateJobUseCase.execute({
    jobId,
    ...body,
  })

  return reply.status(200).send({
    job,
  })
}
