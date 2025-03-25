import { Job, Prisma } from '@prisma/client'

export interface JobsRepository {
  create(data: Prisma.JobUncheckedCreateInput): Promise<Job>
  findById(id: string): Promise<Job | null>
  delete(id: string): Promise<void>
  update(id: string, data: Prisma.JobUpdateInput): Promise<Job>
}
