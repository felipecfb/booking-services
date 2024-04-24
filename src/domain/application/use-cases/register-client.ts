import { ClientsRepository } from '../repositories/clients-repository'
import { ClientAlreadyExistsError } from './errors/client-already-exists-error'
import { Either, left, right } from '@/core/either'
import { Client } from '@/domain/enterprise/entities/client'
import { HashGenerator } from '../cryptograpy/hash-generator'

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
  constructor(
    private clientsRepository: ClientsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterClientUseCaseRequest): Promise<RegisterClientUseCaseResponse> {
    const clientWithSameEmail =
      await this.clientsRepository.findClientByEmail(email)

    if (clientWithSameEmail) {
      return left(new ClientAlreadyExistsError(email))
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const client = Client.create({
      name,
      email,
      password: passwordHash,
    })

    await this.clientsRepository.create(client)

    return right({
      client,
    })
  }
}
