import { Either } from '@/core/either'
import { ClientsRepository } from '../repositories/clients-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Client } from '@/domain/enterprise/entities/client'

interface GetClientProfileUseCaseRequest {
  clientId: string
}

type GetClientProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    client: Client
  }
>

export class GetClientProfileUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ clientId }: GetClientProfileUseCaseRequest) {
    const client = await this.clientsRepository.findClientById(clientId)

    if (!client) {
      throw new Error('Client not found')
    }

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      role: client.role,
      createdAt: client.createdAt,
    }
  }
}
