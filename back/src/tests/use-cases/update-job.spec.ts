import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryJobsRepository } from '@/repositories/in-memory/jobs-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { UnauthorizedError } from '@/errors/unauthorized'
import { UpdateJobUseCase } from '@/use-cases/update-job'

let inMemoryJobsRepository: InMemoryJobsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: UpdateJobUseCase

describe('Update job use case', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new UpdateJobUseCase(inMemoryJobsRepository, inMemoryUsersRepository)
  })

  it('should be able to update a job', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    })

    const createdJob = await inMemoryJobsRepository.create({
      userId: createdUser.id,
      companyName: 'old company name',
      description: 'old company description',
      link: 'www.bigtech.com/',
    })

    expect(inMemoryJobsRepository.items[0].companyName).toEqual(
      'old company name',
    )

    const { job } = await sut.execute({
      jobId: createdJob.id,
      userId: createdUser.id,
      companyName: 'new company name',
      description: 'new description',
    })

    expect(inMemoryJobsRepository.items[0].companyName).toEqual(
      'new company name',
    )
    expect(job.id).toEqual(createdJob.id)
  })

  it('should not be able to update a job from another user', async () => {
    const user1 = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    })

    const user2 = await inMemoryUsersRepository.create({
      name: 'another john doe',
      email: 'another johndoe@gmail.com',
      password: '12345678',
    })

    const createdJob = await inMemoryJobsRepository.create({
      userId: user1.id,
      companyName: 'old company name',
      description: 'old company description',
      link: 'www.bigtech.com/',
    })

    await expect(
      sut.execute({
        jobId: createdJob.id,
        userId: 'non-valid-user-id',
        companyName: 'new company name',
        description: 'new description',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)

    await expect(
      sut.execute({
        jobId: createdJob.id,
        userId: user2.id,
        companyName: 'new company name',
        description: 'new description',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
