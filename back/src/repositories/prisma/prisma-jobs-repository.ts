import { Prisma, Job } from '@prisma/client'
import { JobsRepository } from '../jobs-repository'
import { prisma } from '../../lib/prisma'

export class PrismaJobsRepository implements JobsRepository {
  async delete(id: string) {
    await prisma.job.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string) {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    })

    return job
  }

  async create(data: Prisma.JobUncheckedCreateInput): Promise<Job> {
    const jobs = await prisma.job.create({
      data,
    })

    return jobs
  }
}
