import { beforeEach, describe, expect, it } from 'vitest'
import { CreateJobUseCase } from './create-job'
import { InMemoryJobsRepository } from '@/repositories/in-memory/jobs-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { ResourceNotFoundError } from '@/errors/resource-not-found'

let inMemoryJobsRepository: InMemoryJobsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateJobUseCase

describe('Fetch user use case', () => {
  beforeEach(() => {
    inMemoryJobsRepository = new InMemoryJobsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new CreateJobUseCase(inMemoryJobsRepository, inMemoryUsersRepository)
  })

  it('should be able to create a new job', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '12345678',
    })

    await sut.execute({
      userId: createdUser.id,
      companyName: 'new big tech company',
      description: 'big tech company description',
      link: 'www.bigtech.com/',
    })

    expect(inMemoryJobsRepository.items).toHaveLength(1)
    expect(inMemoryJobsRepository.items[0].userId).toEqual(createdUser.id)
  })

  it('should be not able to create a new job without an user', async () => {
    await expect(
      sut.execute({
        userId: 'non-valid-userId',
        companyName: 'new big tech company',
        description: 'big tech company description',
        link: 'www.bigtech.com/',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
