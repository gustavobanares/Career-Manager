import { Prisma, Job } from '@prisma/client'
import { JobsRepository } from '../jobs-repository'
import { prisma } from '../../lib/prisma'

export class PrismaJobsRepository implements JobsRepository {
  async create(data: Prisma.JobUncheckedCreateInput): Promise<Job> {
    const jobs = await prisma.job.create({
      data,
    })

    return jobs
  }
}
