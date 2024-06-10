import { Either, right } from '@/core/either'
import { User } from '@/domain/enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface FetchUsersEstablishmentUseCaseRequest {
  establishmentId: string
  page: number
}

type FetchUsersEstablishmentUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

export class FetchUsersEstablishmentUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    establishmentId,
    page,
  }: FetchUsersEstablishmentUseCaseRequest): Promise<FetchUsersEstablishmentUseCaseResponse> {
    const users = await this.usersRepository.findUsersByEstablishmentId(
      establishmentId,
      { page },
    )

    return right({
      users,
    })
  }
}
