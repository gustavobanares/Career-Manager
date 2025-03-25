import { JobsRepository } from '@/repositories/jobs-repository'
import { Job } from '@prisma/client'

interface GetJobUseCaseRequest {
  jobId: string
}

interface GetJobUseCaseResponse {
  job: Job
}

export class GetJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    jobId,
  }: GetJobUseCaseRequest): Promise<GetJobUseCaseResponse> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      throw new Error('Job not found')
    }

    return {
      job,
    }
  }
}
