import { Establishment } from '@/domain/enterprise/entities/establishment'

export abstract class EstablishmentsRepository {
  abstract findEstablishmentById(
    establishmentId: string,
  ): Promise<Establishment | null>

  abstract create(establishment: Establishment): Promise<Establishment>
}
