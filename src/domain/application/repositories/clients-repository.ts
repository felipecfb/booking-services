import { Prisma, Client } from '@prisma/client'

export interface IClientsRepository {
  findClientById(id: string): Promise<Client | null>
  findClientByEmail(email: string): Promise<Client | null>
  create(data: Prisma.ClientCreateInput): Promise<Client>
}
