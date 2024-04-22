import { Prisma, Service } from '@prisma/client'

export interface ServicesRepository {
  create(data: Prisma.ServiceCreateInput): Promise<Service>
}
