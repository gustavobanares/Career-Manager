import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserUseCase } from './fetch-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: FetchUserUseCase

describe('Fetch user use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new FetchUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to fetch an user by id', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.id).toEqual(createdUser.id)
  })
})
