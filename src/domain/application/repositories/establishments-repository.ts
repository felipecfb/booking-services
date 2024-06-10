import { Establishment } from '@/domain/enterprise/entities/establishment'

export interface EstablishmentsRepository {
  create(establishment: Establishment): Promise<Establishment>
}
