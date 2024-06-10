import { User } from '@/domain/enterprise/entities/user'

export interface UsersRepository {
  findUserById(id: string): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  create(User: User): Promise<User>
}
