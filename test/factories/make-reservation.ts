import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Reservation,
  ReservationProps,
} from '@/domain/enterprise/entities/reservation'

export function makeReservation(
  override: Partial<ReservationProps> = {},
  id?: UniqueEntityID,
) {
  const reservation = Reservation.create(
    {
      clientId: new UniqueEntityID(),
      serviceId: new UniqueEntityID(),
      startDate: faker.date.soon({ days: 7 }),
      endDate: faker.date.soon({ days: 10 }),
      ...override,
    },
    id,
  )

  return reservation
}
