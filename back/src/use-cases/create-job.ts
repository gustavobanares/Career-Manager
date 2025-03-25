import { Job, JobStatus } from '@prisma/client'
import { JobsRepository } from '../repositories/jobs-repository'

interface CreateJobUseCaseRequest {
  companyName: string
  application_status: JobStatus
  description: string
  feedback: string
  link: string
  userId: string
}

interface CreateJobUseCaseResponse {
  job: Job
}

export class CreateJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    companyName,
    // eslint-disable-next-line
    application_status,
    description,
    feedback,
    link,
    userId,
  }: CreateJobUseCaseRequest): Promise<CreateJobUseCaseResponse> {
    const job = await this.jobsRepository.create({
      companyName,
      // eslint-disable-next-line
      application_status,
      description,
      feedback,
      link,
      userId,
    })

    return {
      job,
    }
  }
}
