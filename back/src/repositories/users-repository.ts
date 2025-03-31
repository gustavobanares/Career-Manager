import { User } from '@prisma/client'
import { SignUpUseCaseRequest } from '../use-cases/sign-up'

export interface UsersRepository {
  create(data: SignUpUseCaseRequest): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
  saveCv(userId: string, data: string): Promise<void>
}
