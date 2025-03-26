import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repositories'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

export interface FetchUserUseCaseRequest {
  userId: string
}

export interface FetchUserUseCaseResponse {
  user: User
}

export class FetchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: FetchUserUseCaseRequest): Promise<FetchUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
