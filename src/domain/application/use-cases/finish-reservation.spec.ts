import { makeClient } from 'test/factories/make-client'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'
import { makeService } from 'test/factories/make-service'
import { FinishReservationUseCase } from './finish-reservation'
import { makeReservation } from 'test/factories/make-reservation'
import { NotAllowedError } from './errors/not-allowed'

let inMemoryReservationsRepository: InMemoryReservationsRepository
let inMemoryClientsRepository: InMemoryClientsRepository
let sut: FinishReservationUseCase

describe('Finish Reservation Use Case', () => {
  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository()
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new FinishReservationUseCase(
      inMemoryReservationsRepository,
      inMemoryClientsRepository,
    )
  })

  it('should be able to finish a reservation', async () => {
    const client = makeClient({ role: 'ADMIN' })

    inMemoryClientsRepository.items.push(client)

    const service = makeService({
      clientId: client.id,
    })

    const reservation = makeReservation({
      serviceId: service.id,
      clientId: client.id,
    })

    inMemoryReservationsRepository.items.push(reservation)

    const result = await sut.execute({
      clientId: client.id.toString(),
      reservationId: reservation.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toMatchObject({
      reservation: {
        status: 'FINISHED',
      },
    })
  })

  it('should not be able to finish a reservation if the client is not an admin', async () => {
    const client = makeClient()

    inMemoryClientsRepository.items.push(client)

    const service = makeService({
      clientId: client.id,
    })

    const reservation = makeReservation({
      serviceId: service.id,
      clientId: client.id,
    })

    inMemoryReservationsRepository.items.push(reservation)

    const result = await sut.execute({
      clientId: client.id.toString(),
      reservationId: reservation.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new NotAllowedError())
  })
})
