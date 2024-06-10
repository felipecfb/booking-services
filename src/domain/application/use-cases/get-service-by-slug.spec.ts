import { InMemoryServicesRepository } from 'test/repositories/in-memory-services-repository'
import { GetServiceBySlugUseCase } from './get-service-by-slug'
import { makeService } from 'test/factories/make-service'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryServicesRepository: InMemoryServicesRepository
let sut: GetServiceBySlugUseCase

describe('Get Service By Slug', () => {
  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository()
    sut = new GetServiceBySlugUseCase(inMemoryServicesRepository)
  })

  it('should be able to get a service by slug', async () => {
    const newService = makeService({
      slug: Slug.create('example-service'),
    })

    await inMemoryServicesRepository.create(newService)

    const result = await sut.execute({
      slug: 'example-service',
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value?.service.name).toBe(newService.name)
    }
  })
})
