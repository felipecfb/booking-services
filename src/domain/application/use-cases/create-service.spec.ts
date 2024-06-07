import { InMemoryServicesRepository } from 'test/repositories/in-memory-services-repository'
import { CreateServiceUseCase } from './create-service'
import { makeClient } from 'test/factories/make-client'
import { ClientNotAuthorized } from './errors/client-not-authorized'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'

let inMemoryServicesRepository: InMemoryServicesRepository
let inMemoryClientsRepository: InMemoryClientsRepository
let sut: CreateServiceUseCase

describe('Create Service Use Case', () => {
  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository()
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new CreateServiceUseCase(
      inMemoryServicesRepository,
      inMemoryClientsRepository,
    )
  })

  it('should be able to create a service', async () => {
    const client = makeClient({ role: 'PREMIUM' })

    inMemoryClientsRepository.create(client)

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

  it('should not be able to create a service if client is regular', async () => {
    const client = makeClient()

    inMemoryClientsRepository.create(client)

    const result = await sut.execute({
      clientId: client.id.toString(),
      name: 'Service 1',
      description: 'Description 1',
      price: 12000,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new ClientNotAuthorized())
  })
})
