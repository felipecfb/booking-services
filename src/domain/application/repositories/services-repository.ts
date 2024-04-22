import { Prisma, Service } from '@prisma/client'

export interface IServicesRepository {
  create(data: Prisma.ServiceCreateInput): Promise<Service>
}
