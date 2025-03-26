import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FetchUserUseCase } from '../fetch-user'

export async function makeFetchUserUseCase() {
  const prismaRepository = new PrismaUsersRepository()
  const fetchUserUseCase = new FetchUserUseCase(prismaRepository)

  return fetchUserUseCase
}
