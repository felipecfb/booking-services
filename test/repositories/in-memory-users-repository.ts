import { PaginationParams } from '@/core/repositories/pagination-params'
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

  async findUsersByEstablishmentId(
    establishmentId: string,
    { page }: PaginationParams,
  ): Promise<User[]> {
    const users = this.items
      .filter((user) => user.establishmentId === establishmentId)
      .slice((page - 1) * 20, page * 20)

    return users
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
