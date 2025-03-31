import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { SignUpUseCase } from '@/use-cases/sign-up'
import { beforeEach, describe, expect, it } from 'vitest'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: SignUpUseCase

describe('Sign-up use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new SignUpUseCase(inMemoryUsersRepository)
  })

  it('should be able to create a new user', async () => {
    await sut.execute({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: '1234567',
    })

    expect(inMemoryUsersRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'john doe',
        email: 'johndoe@gmail.com',
      }),
    )
    expect(inMemoryUsersRepository.items).toHaveLength(1)
  })
})
