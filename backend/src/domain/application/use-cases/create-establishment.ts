import { Either, left, right } from '@/core/either'
import { Establishment } from '@/domain/enterprise/entities/establishment'
import { EstablishmentsRepository } from '../repositories/establishments-repository'
import { Injectable } from '@nestjs/common'
import { EstablishmentAlreadyExistsError } from './errors/establishment-already-exists-error'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'

interface CreateEstablishmentUseCaseRequest {
  name: string
  description: string
}

type CreateEstablishmentUseCaseResponse = Either<
  EstablishmentAlreadyExistsError,
  {
    establishment: Establishment
  }
>

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(private establishmentsRepository: EstablishmentsRepository) {}

  async execute({
    name,
    description,
  }: CreateEstablishmentUseCaseRequest): Promise<CreateEstablishmentUseCaseResponse> {
    const establishmentAlreadyExists =
      await this.establishmentsRepository.findBySlug(
        Slug.createFromText(name).value,
      )

    if (establishmentAlreadyExists) {
      return left(new EstablishmentAlreadyExistsError())
    }

    const establishment = Establishment.create({
      name,
      description,
    })

    await this.establishmentsRepository.create(establishment)

    return right({
      establishment,
    })
  }
}
