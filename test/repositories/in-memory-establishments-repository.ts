import { EstablishmentsRepository } from '@/domain/application/repositories/establishments-repository'
import { Establishment } from '@/domain/enterprise/entities/establishment'

export class InMemoryEstablishmentsRepository
  implements EstablishmentsRepository
{
  public items: Establishment[] = []

  async create(establishment: Establishment): Promise<Establishment> {
    this.items.push(establishment)

    return establishment
  }
}
