import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryJobsRepository } from '@/repositories/in-memory/jobs-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { FetchJobsHistoryUseCase } from '@/use-cases/fetch-jobs'

let inMemoryJobsRepository: InMemoryJobsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: FetchJobsHistoryUseCase

describe('Fetch User Jobs use case', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new FetchJobsHistoryUseCase(
      inMemoryJobsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to fetch recent user jobs', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '1234567',
    })

    const createdJob = await inMemoryJobsRepository.create({
      userId: createdUser.id,
      companyName: 'new big tech company',
      description: 'big tech company description',
      link: 'www.bigtech.com/',
    })

    const { jobs } = await sut.execute({ userId: createdUser.id })

    expect(jobs).toHaveLength(1)
    expect(jobs[0].id).toEqual(createdJob.id)
  })
})
