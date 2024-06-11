import { EstablishmentsRepository } from '@/domain/application/repositories/establishments-repository'
import { Establishment } from '@/domain/enterprise/entities/establishment'

export class InMemoryEstablishmentsRepository
  implements EstablishmentsRepository
{
  public items: Establishment[] = []

  async findBySlug(slug: string): Promise<Establishment | null> {
    const establishment = this.items.find((item) => item.slug.value === slug)

    if (!establishment) {
      return null
    }

    return establishment
  }

  async findEstablishmentById(id: string): Promise<Establishment | null> {
    const establishment = this.items.find(
      (establishment) => establishment.id.toString() === id,
    )

    if (!establishment) {
      return null
    }

    return establishment
  }

  async create(establishment: Establishment): Promise<Establishment> {
    this.items.push(establishment)

    return establishment
  }
}
