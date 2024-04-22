import { IClientsRepository } from '../repositories/clients-repository'

interface GetClientProfileUseCaseRequest {
  clientId: string
}

export class GetClientProfileUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

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
