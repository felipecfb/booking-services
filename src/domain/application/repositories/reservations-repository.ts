import { Reservation } from '@/domain/enterprise/entities/reservation'

export interface ReservationsRepository {
  create(reservation: Reservation): Promise<Reservation>
}
