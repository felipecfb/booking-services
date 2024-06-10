import { makeClient } from 'test/factories/make-client'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'
import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'
import { makeService } from 'test/factories/make-service'
import { ConfirmReservationUseCase } from './confirm-reservation'
import { makeReservation } from 'test/factories/make-reservation'

let inMemoryReservationsRepository: InMemoryReservationsRepository
let inMemoryClientsRepository: InMemoryClientsRepository
let sut: ConfirmReservationUseCase

describe('Confirm Reservation Use Case', () => {
  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository()
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new ConfirmReservationUseCase(
      inMemoryReservationsRepository,
      inMemoryClientsRepository,
    )
  })

  it('should be able to confirm a reservation', async () => {
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
        status: 'CONFIRMED',
      },
    })
  })
})
