import { Establishment } from '@/domain/enterprise/entities/establishment'

export interface EstablishmentsRepository {
  findEstablishmentById(id: string): Promise<Establishment | null>
  create(establishment: Establishment): Promise<Establishment>
}
