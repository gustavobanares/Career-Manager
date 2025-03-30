import { Job, JobStatus } from '@prisma/client'
import { JobsRepository } from '../repositories/jobs-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

interface CreateJobUseCaseRequest {
  companyName: string
  application_status?: JobStatus
  description: string
  link: string
  userId: string
}

interface CreateJobUseCaseResponse {
  job: Job
}

export class CreateJobUseCase {
  constructor(
    private jobsRepository: JobsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    companyName,
    application_status,
    description,
    link,
    userId,
  }: CreateJobUseCaseRequest): Promise<CreateJobUseCaseResponse> {
    const doesUserExists = await this.usersRepository.findById(userId)

    if (!doesUserExists) {
      throw new ResourceNotFoundError()
    }

    const job = await this.jobsRepository.create({
      companyName,
      application_status,
      description,
      link,
      userId,
    })

    return {
      job,
    }
  }
}
