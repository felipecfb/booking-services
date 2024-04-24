import { InMemoryServicesRepository } from 'test/repositories/in-memory-services-repository'
import { makeClient } from 'test/factories/make-client'
import { CreateReservationUseCase } from './create-reservation'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'
import { makeService } from 'test/factories/make-service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryReservationsRepository: InMemoryReservationsRepository
let inMemoryClientsRepository: InMemoryClientsRepository
let inMemoryServicesRepository: InMemoryServicesRepository
let sut: CreateReservationUseCase

describe('Create Reservation Use Case', () => {
  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository()
    inMemoryServicesRepository = new InMemoryServicesRepository()
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new CreateReservationUseCase(
      inMemoryReservationsRepository,
      inMemoryServicesRepository,
      inMemoryClientsRepository,
    )
  })

  it('should be able to create a reservation', async () => {
    const client = makeClient()

    inMemoryClientsRepository.items.push(client)

    const service = makeService({
      clientId: client.id,
    })

    inMemoryServicesRepository.items.push(service)

    const result = await sut.execute({
      clientId: client.id.toString(),
      serviceId: service.id.toString(),
      startDate: new Date(),
      endDate: new Date(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      reservation: inMemoryReservationsRepository.items[0],
    })
  })

  it('should not be able to create a reservation with a non-existent client', async () => {
    const clientId = 'non-existent-client'

    const service = makeService({
      clientId: new UniqueEntityID('non-existent-client'),
    })

    inMemoryServicesRepository.items.push(service)

    const result = await sut.execute({
      clientId,
      serviceId: service.id.toString(),
      startDate: new Date(),
      endDate: new Date(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new ResourceNotFoundError('Client not found'))
  })

  it('should not be able to create a reservation with a non-existent service', async () => {
    const client = makeClient()

    inMemoryClientsRepository.items.push(client)

    const serviceId = 'non-existent-service'

    const result = await sut.execute({
      clientId: client.id.toString(),
      serviceId,
      startDate: new Date(),
      endDate: new Date(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new ResourceNotFoundError('Service not found'))
  })
})
