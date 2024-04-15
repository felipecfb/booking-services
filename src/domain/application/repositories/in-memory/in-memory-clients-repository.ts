import { randomUUID } from 'node:crypto'
import { Client, Prisma } from '@prisma/client'

import { IClientsRepository } from '../clients-repository'

export class InMemoryClientsRepository implements IClientsRepository {
  public clients: Client[] = []

  async findClientByEmail(email: string): Promise<Client | null> {
    const client = this.clients.find((client) => client.email === email)

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

    this.clients.push(client)

    return client
  }
}
