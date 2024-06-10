import { Either, left, right } from '@/core/either'
import { ClientsRepository } from '../repositories/clients-repository'
import { ReservationsRepository } from '../repositories/reservations-repository'
import { Reservation } from '@/domain/enterprise/entities/reservation'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed'

export interface FinishReservationRequest {
  clientId: string
  reservationId: string
}

type FinishReservationResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    reservation: Reservation
  }
>

export class FinishReservationUseCase {
  constructor(
    private reservationsRepository: ReservationsRepository,
    private clientsRepository: ClientsRepository,
  ) {}

  async execute({
    clientId,
    reservationId,
  }: FinishReservationRequest): Promise<FinishReservationResponse> {
    const client = await this.clientsRepository.findClientById(clientId)

    if (!client) {
      return left(new ResourceNotFoundError('Client not found'))
    }

    if (client?.role !== 'ADMIN') {
      return left(new NotAllowedError())
    }

    const reservation =
      await this.reservationsRepository.findReservationById(reservationId)

    if (!reservation) {
      return left(new ResourceNotFoundError('Reservation not found'))
    }

    reservation.finish()

    return right({
      reservation,
    })
  }
}
