import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signUpSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = signUpSchema.parse(request.body)
}
