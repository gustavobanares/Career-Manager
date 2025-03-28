import { User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'
import { SignUpUseCaseRequest } from '@/use-cases/sign-up'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create({ email, name, password }: SignUpUseCaseRequest): Promise<User> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
    }

    this.items.push(user)

    return user
  }
}
