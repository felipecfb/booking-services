import { PaginationParams } from '@/core/repositories/pagination-params'
import { ServicesRepository } from '@/domain/application/repositories/services-repository'
import { Service } from '@/domain/enterprise/entities/service'

export class InMemoryServicesRepository implements ServicesRepository {
  public items: Service[] = []

  async findMany({ page }: PaginationParams): Promise<Service[]> {
    const services = this.items.slice((page - 1) * 20, page * 20)

    return services
  }

  async findServiceById(id: string): Promise<Service | null> {
    const service = this.items.find((service) => service.id.toString() === id)

    if (!service) {
      return null
    }

    return service
  }

  async findBySlug(slug: string): Promise<Service | null> {
    const service = this.items.find((item) => item.slug.value === slug)

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
