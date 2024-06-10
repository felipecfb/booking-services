import { PaginationParams } from '@/core/repositories/pagination-params'
import { Reservation } from '@/domain/enterprise/entities/reservation'

export interface ReservationsRepository {
  create(reservation: Reservation): Promise<Reservation>
  findReservationById(reservationId: string): Promise<Reservation | undefined>
  confirmReservation(reservationId: string): Promise<Reservation>
  findMany(params: PaginationParams): Promise<Reservation[]>
}
