import { FastifyReply, FastifyRequest } from 'fastify'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { makeSaveCvUseCase } from '@/use-cases/factories/make-save-cv-use-case'
import { z } from 'zod'

export async function saveCv(request: FastifyRequest, reply: FastifyReply) {
  const saveCvSchema = z.object({
    content: z.string(),
  })

  const { content } = saveCvSchema.parse(request.body)

  try {
    const saveCvUseCase = await makeSaveCvUseCase()

    const userId = request.user.sub

    await saveCvUseCase.execute({ userId, data: content })

    reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Resource not found' })
    }
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
