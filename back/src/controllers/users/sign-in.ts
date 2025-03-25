import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { SignInUseCase } from '../../use-cases/sign-in'

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = signInSchema.parse(request.body)

  try {
    const prismaRepository = new PrismaUsersRepository()
    const signInUseCase = new SignInUseCase(prismaRepository)

    const user = await signInUseCase.execute({ email, password })

    reply.status(200).send({
      user,
    })
  } catch (error) {
    reply.status(409).send({
      message: 'credenciais invalidas',
    })
  }
}
