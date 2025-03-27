import { Job, Prisma } from '@prisma/client'
import { JobsRepository } from '../jobs-repository'
import { randomUUID } from 'node:crypto'
import { UpdateJobUseCaseRequest } from '@/use-cases/update-job'

export class InMemoryJobsRepository implements JobsRepository {
  public items: Job[] = []

  async create({
    companyName,
    description,
    application_status,
    userId,
    link,
  }: Prisma.JobUncheckedCreateInput): Promise<Job> {
    const job = {
      id: randomUUID(),
      companyName,
      application_status: application_status ?? 'APPLIED',
      description,
      link: link ?? '',
      feedback: null,
      createdAt: new Date(),
      updatedAt: null,
      userId,
    }

    this.items.push(job)

    return job
  }

  async findById(id: string): Promise<Job | null> {
    const job = this.items.find((item) => item.id === id)

    if (!job) {
      return null
    }

    return job
  }

  async delete(id: string): Promise<void> {
    const jobIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(jobIndex, 1)
  }

  async update(id: string, data: UpdateJobUseCaseRequest): Promise<Job> {
    const jobIndex = this.items.findIndex((item) => item.id === id)

    this.items[jobIndex] = { ...this.items[jobIndex], ...data }

    return this.items[jobIndex]
  }
}
