import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { UnauthorizedError } from '@/errors/unauthorized'
import { JobsRepository } from '@/repositories/jobs-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Job, JobStatus } from '@prisma/client'

export interface UpdateJobUseCaseRequest {
  userId: string
  jobId: string
  companyName?: string
  application_status?: JobStatus
  description?: string
  feedback?: string
  link?: string
}

export interface UpdateJobUseCaseResponse {
  job: Job
}

export class UpdateJobUseCase {
  constructor(
    private jobsRepository: JobsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    jobId,
    companyName,
    application_status,
    description,
    feedback,
    link,
  }: UpdateJobUseCaseRequest): Promise<UpdateJobUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const jobExists = await this.jobsRepository.findById(jobId)

    if (!jobExists) {
      throw new ResourceNotFoundError()
    }

    if (user.id !== jobExists.userId) {
      throw new UnauthorizedError()
    }

    const job = await this.jobsRepository.update(jobId, {
      companyName,
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
