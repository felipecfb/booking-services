import { PaginationParams } from '@/core/repositories/pagination-params'
import { Service } from '@/domain/enterprise/entities/service'

export interface ServicesRepository {
  findServiceById(id: string): Promise<Service | null>
  findBySlug(slug: string): Promise<Service | null>
  findMany(params: PaginationParams): Promise<Service[]>
  create(service: Service): Promise<Service>
}
