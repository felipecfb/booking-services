import { Prisma, Client } from '@prisma/client'

export interface IClientsRepository {
  findClientByEmail(email: string): Promise<Client | null>
  create(data: Prisma.ClientCreateInput): Promise<Client>
}
