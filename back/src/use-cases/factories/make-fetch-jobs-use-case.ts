import { PrismaJobsRepository } from '@/repositories/prisma/prisma-jobs-repository'
import { FetchJobsHistoryUseCase } from '../fetch-jobs'

export async function makeFetchJobsHistoryUseCase() {
  const prismaRepository = new PrismaJobsRepository()
  const fetchJobsHistoryUseCase = new FetchJobsHistoryUseCase(prismaRepository)

  return fetchJobsHistoryUseCase
}
