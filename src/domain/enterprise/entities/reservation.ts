import { Optional } from '@/core/types/optional'
import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'

enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED',
}

export interface ReservationProps {
  clientId: UniqueEntityID
  serviceId: UniqueEntityID
  startDate: Date
  endDate: Date
  status: ReservationStatus
  createdAt: Date
  updatedAt?: Date | null
}

export class Reservation extends Entity<ReservationProps> {
  get clientId() {
    return this.props.clientId
  }

  get ReservationId() {
    return this.props.clientId
  }

  get startDate() {
    return this.props.startDate
  }

  get endDate() {
    return this.props.endDate
  }

  get status() {
    return this.props.status
  }

  set status(status: ReservationStatus) {
    this.props.status = status
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ReservationProps, 'status' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const reservation = new Reservation(
      {
        ...props,
        status: props.status ?? ReservationStatus.PENDING,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return reservation
  }

  confirm() {
    this.status = ReservationStatus.CONFIRMED
  }
}
