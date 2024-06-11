import { Either, left, right } from '@/core/either'
import { Establishment } from '@/domain/enterprise/entities/establishment'
import { EstablishmentsRepository } from '../repositories/establishments-repository'
import { Injectable } from '@nestjs/common'
import { EstablishmentAlreadyExistsError } from './errors/establishment-already-exists-error'
import { UsersRepository } from '../repositories/users-repository'
import { NotAllowedError } from './errors/not-allowed'

interface CreateEstablishmentUseCaseRequest {
  name: string
  description: string
  document: string
  ownerId: string
}

type CreateEstablishmentUseCaseResponse = Either<
  EstablishmentAlreadyExistsError | NotAllowedError,
  {
    establishment: Establishment
  }
>

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private establishmentsRepository: EstablishmentsRepository,
  ) {}

  async execute({
    name,
    description,
    document,
    ownerId,
  }: CreateEstablishmentUseCaseRequest): Promise<CreateEstablishmentUseCaseResponse> {
    const user = await this.usersRepository.findUserById(ownerId)

    if (!user) {
      return left(new NotAllowedError())
    }

    const userHasAnotherEstablishment =
      await this.establishmentsRepository.findEstablishmentByOwnerId(ownerId)

    if (userHasAnotherEstablishment) {
      return left(new NotAllowedError())
    }

    const establishmentAlreadyExists =
      await this.establishmentsRepository.findEstablishmentByDocument(document)

    if (establishmentAlreadyExists) {
      return left(new EstablishmentAlreadyExistsError())
    }

    await this.usersRepository.updateRole(user, 'OWNER')

    const establishment = Establishment.create({
      name,
      description,
      document,
      ownerId,
      users: [user],
    })

    await this.establishmentsRepository.create(establishment)

    return right({
      establishment,
    })
  }
}
