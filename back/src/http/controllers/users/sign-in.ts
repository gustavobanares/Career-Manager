import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSignInUseCase } from '@/use-cases/factories/make-sign-in-use-case'

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
  const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = signInSchema.parse(request.body)

  try {
    const signInUseCase = await makeSignInUseCase()

    const { user } = await signInUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '1d',
        },
      },
    )

    reply.status(200).send({
      token,
    })
  } catch (error) {
    reply.status(409).send({
      message: 'Invalid credentials',
    })
  }
}
