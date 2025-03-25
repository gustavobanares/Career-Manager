import { PrismaJobsRepository } from '@/repositories/prisma/prisma-jobs-repository'
import { UpdateJobUseCase } from '../update-job'

export function makeUpdateJobUseCase() {
  const jobsRepository = new PrismaJobsRepository()
  const useCase = new UpdateJobUseCase(jobsRepository)

  return useCase
}
