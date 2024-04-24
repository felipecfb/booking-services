import { Either, left, right } from '@/core/either'
import { ServicesRepository } from '../repositories/services-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ClientsRepository } from '../repositories/clients-repository'
import { ReservationsRepository } from '../repositories/reservations-repository'
import { Reservation } from '@/domain/enterprise/entities/reservation'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

export interface CreateReservationUseCaseRequest {
  clientId: string
  serviceId: string
  startDate: Date
  endDate: Date
}

type CreateReservationUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    reservation: Reservation
  }
>

export class CreateReservationUseCase {
  constructor(
    private reservationsRepository: ReservationsRepository,
    private servicesRepository: ServicesRepository,
    private clientsRepository: ClientsRepository,
  ) {}

  async execute({
    clientId,
    serviceId,
    startDate,
    endDate,
  }: CreateReservationUseCaseRequest): Promise<CreateReservationUseCaseResponse> {
    const client = await this.clientsRepository.findClientById(clientId)

    if (!client) {
      return left(new ResourceNotFoundError('Client not found'))
    }

    const service = await this.servicesRepository.findServiceById(serviceId)

    if (!service) {
      return left(new ResourceNotFoundError('Service not found'))
    }

    const reservation = Reservation.create({
      clientId: new UniqueEntityID(clientId),
      serviceId: new UniqueEntityID(serviceId),
      startDate,
      endDate,
    })

    await this.reservationsRepository.create(reservation)

    return right({
      reservation,
    })
  }
}
