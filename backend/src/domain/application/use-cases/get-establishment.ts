import { Either, left, right } from '@/core/either'
import { Establishment } from '@/domain/enterprise/entities/establishment'
import { EstablishmentsRepository } from '../repositories/establishments-repository'
import { Injectable } from '@nestjs/common'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface GetEstablishmentUseCaseRequest {
  establishmentId: string
}

type GetEstablishmentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    establishment: Establishment
  }
>

@Injectable()
export class GetEstablishmentUseCase {
  constructor(private establishmentsRepository: EstablishmentsRepository) {}

  async execute({
    establishmentId,
  }: GetEstablishmentUseCaseRequest): Promise<GetEstablishmentUseCaseResponse> {
    const establishment =
      await this.establishmentsRepository.findEstablishmentById(establishmentId)

    if (!establishment) {
      return left(new ResourceNotFoundError('Establishment not found'))
    }

    return right({
      establishment,
    })
  }
}
