import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repositories'

export interface SignUpUseCaseRequest {
  name: string
  email: string
  password: string
}

export interface SignUpUseCaseResponse {
  user: User
}

export class SignUpUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User with this email already exists.')
    }

    const hashedPassword = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return { user }
  }
}
