import { User } from '@/domain/enterprise/entities/user'

export abstract class UsersRepository {
  abstract findUserById(id: string): Promise<User | null>
  abstract findUserByEmail(email: string): Promise<User | null>
  abstract updateRole(user: User, role: string): Promise<void>
  abstract create(user: User): Promise<void>
}
