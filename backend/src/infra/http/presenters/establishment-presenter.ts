import { Establishment } from '@/domain/enterprise/entities/establishment'

export class EstablishmentPresenter {
  static toHTTP(establishment: Establishment) {
    return {
      id: establishment.id.toString(),
      name: establishment.name,
      slug: establishment.slug.value,
      description: establishment.description,
      createdAt: establishment.createdAt,
      updatedAt: establishment.updatedAt,
    }
  }
}
