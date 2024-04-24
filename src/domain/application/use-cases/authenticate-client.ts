import { ClientsRepository } from '../repositories/clients-repository'
import { Either, left, right } from '@/core/either'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { HashComparer } from '../cryptograpy/hash-comparer'
import { Encrypter } from '../cryptograpy/encrypter'

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
  constructor(
    private clientsRepository: ClientsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateClientUseCaseRequest): Promise<AuthenticateClientUseCaseResponse> {
    const client = await this.clientsRepository.findClientByEmail(email)

    if (!client) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      client.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: client.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
