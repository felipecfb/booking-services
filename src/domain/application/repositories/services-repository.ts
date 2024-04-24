import { Service } from '@/domain/enterprise/entities/service'

export interface ServicesRepository {
  create(service: Service): Promise<Service>
}
