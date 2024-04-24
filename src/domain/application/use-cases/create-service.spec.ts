import { InMemoryServicesRepository } from 'test/repositories/in-memory-services-repository'
import { CreateServiceUseCase } from './create-service'
import { makeClient } from 'test/factories/make-client'

let inMemoryServicesRepository: InMemoryServicesRepository
let sut: CreateServiceUseCase

describe('Create Service Use Case', () => {
  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository()
    sut = new CreateServiceUseCase(inMemoryServicesRepository)
  })

  it('should be able to create a service', async () => {
    const client = makeClient()

    const result = await sut.execute({
      clientId: client.id.toString(),
      name: 'Service 1',
      description: 'Description 1',
      price: 12000,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      service: inMemoryServicesRepository.items[0],
    })
  })
})
