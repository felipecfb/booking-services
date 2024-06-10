import { PaginationParams } from '@/core/repositories/pagination-params'
import { ReservationsRepository } from '@/domain/application/repositories/reservations-repository'
import { Reservation } from '@/domain/enterprise/entities/reservation'

export class InMemoryReservationsRepository implements ReservationsRepository {
  public items: Reservation[] = []

  async findMany({ page }: PaginationParams): Promise<Reservation[]> {
    const reservations = this.items.slice((page - 1) * 20, page * 20)

    return reservations
  }

  async confirmReservation(reservationId: string): Promise<Reservation> {
    const reservation = this.items.find(
      (item) => item.id.toString() === reservationId,
    )

    if (!reservation) {
      throw new Error('Reservation not found')
    }

    reservation.confirm()

    return reservation
  }

  async findReservationById(
    reservationId: string,
  ): Promise<Reservation | undefined> {
    const reservation = this.items.find(
      (item) => item.id.toString() === reservationId,
    )

    if (!reservation) {
      throw new Error('Reservation not found')
    }

    return reservation
  }

  async create(reservation: Reservation): Promise<Reservation> {
    this.items.push(reservation)

    return reservation
  }
}
