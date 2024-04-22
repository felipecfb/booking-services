import { hash } from 'bcryptjs'

import { ClientsRepository } from '../repositories/clients-repository'
import { ClientAlreadyExistsError } from './errors/client-already-exists-error'
import { Either, left, right } from '@/core/either'
import { Client } from '@prisma/client'

interface RegisterClientUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterClientUseCaseResponse = Either<
  ClientAlreadyExistsError,
  {
    client: Client
  }
>

export class RegisterClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const passwordHash = await hash(password, 8)

    const clientWithSameEmail =
      await this.clientsRepository.findClientByEmail(email)

    if (clientWithSameEmail) {
      return left(new ClientAlreadyExistsError(email))
    }

    const client = await this.clientsRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return right({
      client,
    })
  }
}
