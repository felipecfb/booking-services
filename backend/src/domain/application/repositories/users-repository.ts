import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '@/domain/enterprise/entities/user'

export abstract class UsersRepository {
  abstract findUserById(id: string): Promise<User | null>
  abstract findUsersByEstablishmentId(
    establishmentId: string,
    params: PaginationParams,
  ): Promise<User[]>

  abstract findUserByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<void>
}
