import { ServicesRepository } from '@/domain/application/repositories/services-repository'
import { Service } from '@/domain/enterprise/entities/service'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async findServiceById(id: string): Promise<Service | null> {
    const service = this.items.find((service) => service.id.toString() === id)

    if (!service) {
      return null
    }

    return service
  }

  async create(service: Service): Promise<Service> {
    this.items.push(service)

    return service
  }
}
