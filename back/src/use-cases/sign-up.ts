import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { usersRepository } from '../repositories/users-repositories'

export interface signUpRequest {
  name: string
  email: string
  hashedPassword: string
}

export interface signUpResponse {
  user: User
}

export class signUpUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({ name, email, hashedPassword }: signUpRequest): Promise<signUpResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error('User with this email already exists.')
    }

    hashedPassword = await hash(hashedPassword, 6)

    const user = await this.usersRepository.create({name, email, hashedPassword})

    return { user }
  }
}
