import { User } from '@prisma/client'
import { signUpRequest } from '../use-cases/sign-up'

export interface usersRepository {
  create(data: signUpRequest): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
