import { Establishment } from '@/domain/enterprise/entities/establishment'

export interface EstablishmentsRepository {
  findEstablishmentById(establishmentId: string): Promise<Establishment | null>
  create(establishment: Establishment): Promise<Establishment>
}
