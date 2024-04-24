import { ServicesRepository } from '@/domain/application/repositories/services-repository'
import { Service } from '@/domain/enterprise/entities/service'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async create(service: Service): Promise<Service> {
    this.items.push(service)

    return service
  }
}
