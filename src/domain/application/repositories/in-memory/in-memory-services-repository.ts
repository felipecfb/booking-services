import { Prisma, Service } from '@prisma/client'
import { ServicesRepository } from '../services-repository'
import { randomUUID } from 'crypto'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async create(data: Prisma.ServiceCreateInput): Promise<Service> {
    const service = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      disponibility: data.disponibility,
      createdAt: new Date(),
    }

    this.items.push(service)

    return service
  }
}
