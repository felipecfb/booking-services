import { Establishment } from '@/domain/enterprise/entities/establishment'

export abstract class EstablishmentsRepository {
  abstract create(establishment: Establishment): Promise<Establishment>
  abstract findBySlug(slug: string): Promise<Establishment | null>
  abstract findEstablishmentByDocument(
    document: string,
  ): Promise<Establishment | null>

  abstract findEstablishmentById(
    establishmentId: string,
  ): Promise<Establishment | null>
}
