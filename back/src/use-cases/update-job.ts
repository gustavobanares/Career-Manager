import { JobsRepository } from '@/repositories/jobs-repository'
import { Job, JobStatus } from '@prisma/client'

interface UpdateJobUseCaseRequest {
  jobId: string
  companyName?: string
  application_status?: JobStatus
  description?: string
  feedback?: string
  link?: string
}

interface UpdateJobUseCaseResponse {
  job: Job
}

export class UpdateJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    jobId,
    companyName,
    // eslint-disable-next-line
    application_status,
    description,
    feedback,
    link,
  }: UpdateJobUseCaseRequest): Promise<UpdateJobUseCaseResponse> {
    const jobExists = await this.jobsRepository.findById(jobId)

    if (!jobExists) {
      throw new Error('Job not found')
    }

    const job = await this.jobsRepository.update(jobId, {
      companyName,
      // eslint-disable-next-line
      application_status,
      description,
      feedback,
      link,
    })

    return {
      job,
    }
  }
}
