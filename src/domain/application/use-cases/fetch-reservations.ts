import { Either, right } from '@/core/either'
import { ReservationsRepository } from '../repositories/reservations-repository'
import { Reservation } from '@/domain/enterprise/entities/reservation'

export interface FetchReservationUseCaseRequest {
  page: number
}

type FetchReservationUseCaseResponse = Either<
  null,
  {
    reservations: Reservation[]
  }
>

export class FetchReservationUseCase {
  constructor(private reservationsRepository: ReservationsRepository) {}

  async execute({
    page,
  }: FetchReservationUseCaseRequest): Promise<FetchReservationUseCaseResponse> {
    const reservations = await this.reservationsRepository.findMany({ page })

    return right({
      reservations,
    })
  }
}
