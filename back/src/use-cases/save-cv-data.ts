import { UsersRepository } from '../repositories/users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

export interface SaveCvDataUseCaseRequest {
  userId: string
  data: string
}

export class SaveCvDataUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, data }: SaveCvDataUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.saveCv(userId, data)
  }
}
