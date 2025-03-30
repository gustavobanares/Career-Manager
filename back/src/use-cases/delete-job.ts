import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { UnauthorizedError } from '@/errors/unauthorized'
import { JobsRepository } from '@/repositories/jobs-repository'
import { UsersRepository } from '@/repositories/users-repository'

interface DeleteJobUseCaseRequest {
  userId: string
  jobId: string
}

export class DeleteJobUseCase {
  constructor(
    private jobsRepository: JobsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ jobId, userId }: DeleteJobUseCaseRequest) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      throw new ResourceNotFoundError()
    }

    if (user?.id !== job?.userId) {
      throw new UnauthorizedError()
    }

    await this.jobsRepository.delete(jobId)
  }
}
