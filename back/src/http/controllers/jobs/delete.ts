import { makeDeleteJobUseCase } from '@/use-cases/factories/make-delete-job-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteJob(request: FastifyRequest, reply: FastifyReply) {
  const deleteJobUseCase = makeDeleteJobUseCase()

  const userId = request.user.sub

  const paramsSchema = z.object({
    jobId: z.string().uuid(),
  })

  const { jobId } = paramsSchema.parse(request.params)

  await deleteJobUseCase.execute({ jobId, userId })

  return reply.status(204).send('Job excluído com sucesso!')
}
