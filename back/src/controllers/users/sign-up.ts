import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { SignUpUseCase } from '../../use-cases/sign-up'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = signUpSchema.parse(request.body)

  try {
    const prismaRepository = new PrismaUsersRepository()
    const signUpUseCase = new SignUpUseCase(prismaRepository)

    const user = await signUpUseCase.execute({ name, email, password })

    reply.status(200).send({
      user,
    })
  } catch (error) {
    reply.status(409).send({
      message: 'user with this email already exists',
    })
  }
}
