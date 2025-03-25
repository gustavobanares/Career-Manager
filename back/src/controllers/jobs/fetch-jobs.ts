import { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchJobs(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()

    console.log(request.user.sub)

    reply.status(200).send({
      message: 'ok',
    })
  } catch (error) {
    reply.status(409).send({
      message: 'unauthorized',
    })
  }
}
