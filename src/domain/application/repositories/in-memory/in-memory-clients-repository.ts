import { randomUUID } from 'node:crypto'
import { Client, Prisma } from '@prisma/client'

import { ClientsRepository } from '../clients-repository'

export class InMemoryClientsRepository implements ClientsRepository {
  public items: Client[] = []

  async findClientById(id: string): Promise<Client | null> {
    const client = this.items.find((client) => client.id === id)

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

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      role: data.role || 'REGULAR',
    }

    this.items.push(client)

    return client
  }
}
