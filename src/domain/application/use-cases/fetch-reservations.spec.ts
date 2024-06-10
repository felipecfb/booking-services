import { InMemoryReservationsRepository } from 'test/repositories/in-memory-reservations-repository'
import { FetchReservationUseCase } from './fetch-reservations'
import { makeReservation } from 'test/factories/make-reservation'

let inMemoryReservationsRepository: InMemoryReservationsRepository
let sut: FetchReservationUseCase

describe('Create Reservation Use Case', () => {
  beforeEach(() => {
    inMemoryReservationsRepository = new InMemoryReservationsRepository()
    sut = new FetchReservationUseCase(inMemoryReservationsRepository)
  })

  it('should be able to fetch reservations', async () => {
    await inMemoryReservationsRepository.create(makeReservation())
    await inMemoryReservationsRepository.create(makeReservation())
    await inMemoryReservationsRepository.create(makeReservation())

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.reservations).toHaveLength(3)
  })

  it('should be able to fetch paginated reservations', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryReservationsRepository.create(makeReservation())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.reservations).toHaveLength(2)
  })
})
