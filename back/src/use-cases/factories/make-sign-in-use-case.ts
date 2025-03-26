import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SignInUseCase } from '../sign-in'

export async function makeSignInUseCase() {
  const prismaRepository = new PrismaUsersRepository()
  const signInUseCase = new SignInUseCase(prismaRepository)

  return signInUseCase
}
