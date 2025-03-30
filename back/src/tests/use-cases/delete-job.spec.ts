import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryJobsRepository } from '@/repositories/in-memory/jobs-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { UnauthorizedError } from '@/errors/unauthorized'
import { DeleteJobUseCase } from '@/use-cases/delete-job'

let inMemoryJobsRepository: InMemoryJobsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: DeleteJobUseCase

describe('Delete Job use case', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new DeleteJobUseCase(inMemoryJobsRepository, inMemoryUsersRepository)
  })

  it('should be able to delete a job', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '1234567',
    })

    const createdJob = await inMemoryJobsRepository.create({
      userId: user.id,
      companyName: 'new big tech company',
      description: 'big tech company description',
      link: 'www.bigtech.com/',
    })

    expect(inMemoryJobsRepository.items).toHaveLength(1)

    await sut.execute({
      userId: user.id,
      jobId: createdJob.id,
    })

    expect(inMemoryJobsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a job from another user', async () => {
    const user1 = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '1234567',
    })

    const user2 = await inMemoryUsersRepository.create({
      name: 'another john doe',
      email: 'anotherjohndoe@gmail.com',
      password: '1234567',
    })

    const createdJob = await inMemoryJobsRepository.create({
      userId: user1.id,
      companyName: 'new big tech company',
      description: 'big tech company description',
      link: 'www.bigtech.com/',
    })

    await expect(
      sut.execute({
        userId: user2.id,
        jobId: createdJob.id,
      }),
    ).rejects.toBeInstanceOf(UnauthorizedError)
  })
})
