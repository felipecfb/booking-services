import { Service } from '@prisma/client'
import { IServicesRepository } from '../repositories/services-repository'

interface CreateServiceUseCaseRequest {
  name: string
  description: string
  price: number
}

interface CreateServiceUseCaseResponse {
  service: Service
}

export class CreateServiceUseCase {
  constructor(private servicesRepository: IServicesRepository) {}

  async execute({
    name,
    description,
    price,
  }: CreateServiceUseCaseRequest): Promise<CreateServiceUseCaseResponse> {
    const service = await this.servicesRepository.create({
      name,
      description,
      price,
      disponibility: true,
    })

    return {
      service,
    }
  }
}
