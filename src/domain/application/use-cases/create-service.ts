import { Either, right } from '@/core/either'
import { ServicesRepository } from '../repositories/services-repository'
import { Service } from '@/domain/enterprise/entities/service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateServiceUseCaseRequest {
  clientId: string
  name: string
  description: string
  price: number
}

type CreateServiceUseCaseResponse = Either<
  null,
  {
    service: Service
  }
>

export class CreateServiceUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    clientId,
    name,
    description,
    price,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const service = Service.create({
      clientId: new UniqueEntityID(clientId),
      name,
      description,
      price,
    })

    await this.servicesRepository.create(service)

    return right({
      service,
    })
  }
}
