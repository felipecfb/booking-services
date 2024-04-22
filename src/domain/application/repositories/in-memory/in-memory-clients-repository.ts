import { ClientsRepository } from '../clients-repository'
import { Client } from '@/domain/enterprise/entities/client'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async findClientById(id: string): Promise<Client | null> {
    const client = this.items.find((client) => client.id.toString() === id)

    if (!client) {
      return null
    }

    return client
  }

  async findClientByEmail(email: string): Promise<Client | null> {
    const client = this.items.find((client) => client.email === email)

    if (!client) {
      return null
    }

    return client
  }

  async create(client: Client): Promise<Client> {
    this.items.push(client)

    return client
  }
}
