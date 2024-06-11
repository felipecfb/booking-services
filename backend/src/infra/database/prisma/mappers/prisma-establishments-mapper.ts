import { Establishment as PrismaEstablishment, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Establishment } from '@/domain/enterprise/entities/establishment'
import { Slug } from '@/domain/enterprise/entities/value-objects/slug'

export class PrismaEstablishmentsMapper {
  static toDomain(raw: PrismaEstablishment): Establishment {
    return Establishment.create(
      {
        name: raw.name,
        description: raw.description,
        slug: Slug.create(raw.slug),
        ownerId: raw.ownerId,
        document: raw.document,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(
    establishment: Establishment,
  ): Prisma.EstablishmentUncheckedCreateInput {
    return {
      id: establishment.id.toString(),
      name: establishment.name,
      slug: establishment.slug.value,
      ownerId: establishment.ownerId,
      description: establishment.description,
      document: establishment.document,
      createdAt: establishment.createdAt,
      updatedAt: establishment.updatedAt,
    }
  }
}
