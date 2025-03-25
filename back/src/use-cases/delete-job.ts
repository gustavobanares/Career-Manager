import { JobsRepository } from '@/repositories/jobs-repository'

interface DeleteJobUseCaseRequest {
  jobId: string
}

export class DeleteJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({ jobId }: DeleteJobUseCaseRequest) {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      throw new Error('Job not found')
    }

    await this.jobsRepository.delete(jobId)
  }
}
