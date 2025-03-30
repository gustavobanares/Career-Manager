import { Job } from '@prisma/client'
import { JobsRepository } from '@/repositories/jobs-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

interface FetchJobsHistoryUseCaseRequest {
  userId: string
}

interface FetchJobsHistoryUseCaseResponse {
  jobs: Job[]
}

export class FetchJobsHistoryUseCase {
  constructor(
    private jobsrepository: JobsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: FetchJobsHistoryUseCaseRequest): Promise<FetchJobsHistoryUseCaseResponse> {
    const doesUserExists = this.usersRepository.findById(userId)

    if (!doesUserExists) {
      throw new ResourceNotFoundError()
    }

    const jobs = await this.jobsrepository.findManyByUserId(userId)

    return {
      jobs,
    }
  }
}
