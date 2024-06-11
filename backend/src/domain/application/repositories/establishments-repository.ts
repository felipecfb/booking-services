import { Establishment } from '@/domain/enterprise/entities/establishment'

export abstract class EstablishmentsRepository {
  abstract findEstablishmentByOwnerId(
    ownerId: string,
  ): Promise<Establishment | null>

  abstract findEstablishmentByDocument(
    document: string,
  ): Promise<Establishment | null>

  abstract findEstablishmentById(
    establishmentId: string,
  ): Promise<Establishment | null>

  abstract create(establishment: Establishment): Promise<Establishment>
}
