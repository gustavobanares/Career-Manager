import { Job } from '@prisma/client'
import { JobsRepository } from '@/repositories/jobs-repository'

interface FetchJobsHistoryUseCaseRequest {
  userId: string
}

interface FetchJobsHistoryUseCaseResponse {
  jobs: Job[]
}

export class FetchJobsHistoryUseCase {
  constructor(private jobsrepository: JobsRepository) {}

  async execute({
    userId,
  }: FetchJobsHistoryUseCaseRequest): Promise<FetchJobsHistoryUseCaseResponse> {
    const jobs = await this.jobsrepository.findManyByUserId(userId)

    return {
      jobs,
    }
  }
}
