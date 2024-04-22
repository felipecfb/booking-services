import { InMemoryServicesRepository } from '../repositories/in-memory/in-memory-services-repository'
import { CreateServiceUseCase } from './create-service'

let servicesRepository: InMemoryServicesRepository
let sut: CreateServiceUseCase

describe('Create Service Use Case', () => {
  beforeEach(() => {
    servicesRepository = new InMemoryServicesRepository()
    sut = new CreateServiceUseCase(servicesRepository)
  })

  it('should be able to create a service', async () => {
    const response = await sut.execute({
      name: 'Service 1',
      description: 'Description 1',
      price: 12000,
    })

    expect(response.service).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Service 1',
        description: 'Description 1',
        price: 12000,
        disponibility: true,
        createdAt: expect.any(Date),
      }),
    )
  })
})
