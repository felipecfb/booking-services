import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findUserById(id: string): Promise<User | null> {
    const user = this.items.find((user) => user.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(user: User): Promise<User> {
    this.items.push(user)

    return user
  }
}
