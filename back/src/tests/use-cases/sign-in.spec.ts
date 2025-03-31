import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { SignInUseCase } from '@/use-cases/sign-in'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: SignInUseCase

describe('Sign-in use case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new SignInUseCase(inMemoryUsersRepository)
  })

  it('should be able to sign-in', async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@gmail.com',
      password: await hash('1234567', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '1234567',
    })

    expect(user.name).toEqual('john doe')
    expect(createdUser.id).toEqual(user.id)
  })
})
