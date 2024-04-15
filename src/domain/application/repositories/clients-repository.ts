import { Prisma, Client } from '@prisma/client'

export interface IClientsRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>
}
