import { Either, right } from '@/core/either'
import { ServicesRepository } from '../repositories/services-repository'
import { Service } from '@/domain/enterprise/entities/service'

export interface FetchServiceUseCaseRequest {
  page: number
}

type FetchServiceUseCaseResponse = Either<
  null,
  {
    services: Service[]
  }
>

export class FetchServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    page,
  }: FetchServiceUseCaseRequest): Promise<FetchServiceUseCaseResponse> {
    const services = await this.servicesRepository.findMany({ page })

    return right({
      services,
    })
  }
}
