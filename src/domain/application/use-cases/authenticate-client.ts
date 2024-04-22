import { compare } from 'bcryptjs'
import { ClientsRepository } from '../repositories/clients-repository'
import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateClientUseCaseRequest {
  email: string
  password: string
}

type AuthenticateClientUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateClientUseCaseRequest): Promise<AuthenticateClientUseCaseResponse> {
    const client = await this.clientsRepository.findClientByEmail(email)

    if (!client) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await compare(password, client.password)

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = 'valid-access-token'

    return right({
      accessToken,
    })
  }
}
