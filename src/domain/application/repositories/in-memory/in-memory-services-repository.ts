import { Prisma, Service } from '@prisma/client'
import { IServicesRepository } from '../services-repository'
import { randomUUID } from 'crypto'

export class InMemoryServicesRepository implements IServicesRepository {
  public services: Service[] = []

  async create(data: Prisma.ServiceCreateInput): Promise<Service> {
    const service = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      disponibility: data.disponibility,
      createdAt: new Date(),
    }

    this.services.push(service)

    return service
  }
}
