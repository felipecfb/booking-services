import { ReservationsRepository } from '@/domain/application/repositories/reservations-repository'
import { Reservation } from '@/domain/enterprise/entities/reservation'

export class InMemoryReservationsRepository implements ReservationsRepository {
  public items: Reservation[] = []

  async create(reservation: Reservation): Promise<Reservation> {
    this.items.push(reservation)

    return reservation
  }
}
