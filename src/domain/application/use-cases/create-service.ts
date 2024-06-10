import { Either, left, right } from '@/core/either'
import { ServicesRepository } from '../repositories/services-repository'
import { Service } from '@/domain/enterprise/entities/service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ClientsRepository } from '../repositories/clients-repository'
import { NotAllowedError } from './errors/not-allowed'

interface CreateServiceUseCaseRequest {
  clientId: string
  name: string
  description: string
  price: number
}

type CreateServiceUseCaseResponse = Either<
  NotAllowedError,
  {
    service: Service
  }
>

export class CreateServiceUseCase {
  constructor(
    private servicesRepository: ServicesRepository,
    private clientsRepository: ClientsRepository,
  ) {}

  async execute({
    clientId,
    name,
    description,
    price,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const client = await this.clientsRepository.findClientById(clientId)

    if (client?.role === 'REGULAR') {
      return left(new NotAllowedError())
    }

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
