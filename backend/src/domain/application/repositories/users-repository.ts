import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '@/domain/enterprise/entities/user'

export interface UsersRepository {
  findUserById(id: string): Promise<User | null>
  findUsersByEstablishmentId(
    establishmentId: string,
    params: PaginationParams,
  ): Promise<User[]>
  findUserByEmail(email: string): Promise<User | null>
  create(user: User): Promise<void>
}
