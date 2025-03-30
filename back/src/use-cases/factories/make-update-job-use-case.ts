import { PrismaJobsRepository } from '@/repositories/prisma/prisma-jobs-repository'
import { UpdateJobUseCase } from '../update-job'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeUpdateJobUseCase() {
  const jobsRepository = new PrismaJobsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new UpdateJobUseCase(jobsRepository, usersRepository)

  return useCase
}
