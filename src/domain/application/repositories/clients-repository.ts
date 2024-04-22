import { Client } from '@/domain/enterprise/entities/client'

export interface ClientsRepository {
  findClientById(id: string): Promise<Client | null>
  findClientByEmail(email: string): Promise<Client | null>
  create(client: Client): Promise<Client>
}
