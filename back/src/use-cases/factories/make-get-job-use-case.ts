import { PrismaJobsRepository } from '@/repositories/prisma/prisma-jobs-repository'
import { GetJobUseCase } from '../get-job'

export function makeGetJobUseCase() {
  const jobsRepository = new PrismaJobsRepository()
  const useCase = new GetJobUseCase(jobsRepository)

  return useCase
}
