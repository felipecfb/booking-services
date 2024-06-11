import { Either, right } from '@/core/either'
import { Establishment } from '@/domain/enterprise/entities/establishment'
import { EstablishmentsRepository } from '../repositories/establishments-repository'
import { Injectable } from '@nestjs/common'

interface CreateEstablishmentUseCaseRequest {
  name: string
  description: string
}

type CreateEstablishmentUseCaseResponse = Either<
  null,
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
