import { Either, left, right } from '@/core/either'
import { Establishment } from '@/domain/enterprise/entities/establishment'
import { EstablishmentsRepository } from '../repositories/establishments-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { NotAllowedError } from './errors/not-allowed'
import { Injectable } from '@nestjs/common'

interface EditEstablishmentUseCaseRequest {
  establishmentId: string
  userId: string
  name: string
  description: string
}

type EditEstablishmentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    establishment: Establishment
  }
>

@Injectable()
export class EditEstablishmentUseCase {
  constructor(
    private establishmentsRepository: EstablishmentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    establishmentId,
    userId,
    name,
    description,
  }: EditEstablishmentUseCaseRequest): Promise<EditEstablishmentUseCaseResponse> {
    const establishment =
      await this.establishmentsRepository.findEstablishmentById(establishmentId)

    if (!establishment) {
      return left(new ResourceNotFoundError())
    }

    const user = await this.usersRepository.findUserById(userId)

    if (user?.establishmentId !== establishmentId || user.role === 'MEMBER') {
      return left(new NotAllowedError())
    }

    establishment.name = name
    establishment.description = description

    await this.establishmentsRepository.save(establishment)

    return right({
      establishment,
    })
  }
}
