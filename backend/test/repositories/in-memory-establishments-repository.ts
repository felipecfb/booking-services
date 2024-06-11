import { EstablishmentsRepository } from '@/domain/application/repositories/establishments-repository'
import { Establishment } from '@/domain/enterprise/entities/establishment'

export class InMemoryEstablishmentsRepository
  implements EstablishmentsRepository
{
  public items: Establishment[] = []

  async findEstablishmentByOwnerId(
    ownerId: string,
  ): Promise<Establishment | null> {
    const establishment = this.items.find(
      (item) => item.ownerId.toString() === ownerId,
    )

    if (!establishment) {
      return null
    }

    return establishment
  }

  async findEstablishmentByDocument(
    document: string,
  ): Promise<Establishment | null> {
    const establishment = this.items.find((item) => item.document === document)

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

  async save(establishment: Establishment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === establishment.id,
    )

    this.items[itemIndex] = establishment
  }
}
