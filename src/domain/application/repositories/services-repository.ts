import { Service } from '@/domain/enterprise/entities/service'

export interface ServicesRepository {
  findServiceById(id: string): Promise<Service | null>
  create(service: Service): Promise<Service>
}
