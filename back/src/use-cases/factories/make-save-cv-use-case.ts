import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { SaveCvDataUseCase } from '../save-cv-data'

export async function makeSaveCvUseCase() {
  const prismaRepository = new PrismaUsersRepository()
  const saveCvUseCase = new SaveCvDataUseCase(prismaRepository)

  return saveCvUseCase
}
