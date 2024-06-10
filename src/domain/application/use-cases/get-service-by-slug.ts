import { ServicesRepository } from '../repositories/services-repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Service } from '@/domain/enterprise/entities/service'

interface GetServiceBySlugUseCaseRequest {
  slug: string
}

type GetServiceBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    service: Service
  }
>

export class GetServiceBySlugUseCase {
  constructor(private servicesRepository: ServicesRepository) {}

  async execute({
    slug,
  }: GetServiceBySlugUseCaseRequest): Promise<GetServiceBySlugUseCaseResponse> {
    const service = await this.servicesRepository.findBySlug(slug)

    if (!service) {
      return left(new ResourceNotFoundError())
    }

    return right({
      service,
    })
  }
}
