import { PrismaJobsRepository } from '@/repositories/prisma/prisma-jobs-repository'
import { DeleteJobUseCase } from '../delete-job'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeDeleteJobUseCase() {
  const jobsRepository = new PrismaJobsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new DeleteJobUseCase(jobsRepository, usersRepository)

  return useCase
}
