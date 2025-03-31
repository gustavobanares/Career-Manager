import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryJobsRepository } from '@/repositories/in-memory/jobs-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { GetJobUseCase } from '@/use-cases/get-job'

let inMemoryJobsRepository: InMemoryJobsRepository
let sut: GetJobUseCase

describe('Get Job use case', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    sut = new GetJobUseCase(inMemoryJobsRepository)
  })

  it('should be able to get a job by id', async () => {
    const createdJob = await inMemoryJobsRepository.create({
      userId: 'user-id',
      companyName: 'new big tech company',
      description: 'big tech company description',
      link: 'www.bigtech.com/',
    })

    const { job } = await sut.execute({
      jobId: createdJob.id,
    })

    expect(job.id).toEqual(createdJob.id)
  })

  it("should not be able to get a job that doesn't exist", async () => {
    await expect(
      sut.execute({
        jobId: 'non-valid-job-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
