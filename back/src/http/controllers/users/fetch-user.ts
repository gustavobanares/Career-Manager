import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserUseCase } from '@/use-cases/factories/make-fetch-user-use-case'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

export async function fetchUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchUserUseCase = await makeFetchUserUseCase()

    const userId = request.user.sub

    const { user } = await fetchUserUseCase.execute({ userId })

    reply.status(200).send({
      user,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Resource not found' })
    }
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
