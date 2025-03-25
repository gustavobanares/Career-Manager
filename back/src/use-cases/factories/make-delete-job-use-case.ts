import { PrismaJobsRepository } from '@/repositories/prisma/prisma-jobs-repository'
import { DeleteJobUseCase } from '../delete-job'

export function makeDeleteJobUseCase() {
  const jobsRepository = new PrismaJobsRepository()
  const useCase = new DeleteJobUseCase(jobsRepository)

  return useCase
}
