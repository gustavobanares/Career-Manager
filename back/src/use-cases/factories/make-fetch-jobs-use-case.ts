import { PrismaJobsRepository } from '@/repositories/prisma/prisma-jobs-repository'
import { FetchJobsHistoryUseCase } from '../fetch-jobs'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function makeFetchJobsHistoryUseCase() {
  const prismaJobsRepository = new PrismaJobsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const fetchJobsHistoryUseCase = new FetchJobsHistoryUseCase(
    prismaJobsRepository,
    prismaUsersRepository,
  )

  return fetchJobsHistoryUseCase
}
