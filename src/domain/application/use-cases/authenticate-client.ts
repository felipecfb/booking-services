import { compare } from 'bcryptjs'
import { IClientsRepository } from '../repositories/clients-repository'

interface AuthenticateClientUseCaseRequest {
  email: string
  password: string
}

type AuthenticateClientUseCaseResponse = {
  accessToken: string
}

export class AuthenticateClientUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateClientUseCaseRequest): Promise<AuthenticateClientUseCaseResponse> {
    const client = await this.clientsRepository.findClientByEmail(email)

    if (!client) {
      throw new Error('Client not found')
    }

    const isPasswordValid = await compare(password, client.password)

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    const accessToken = 'valid-access-token'

    return {
      accessToken,
    }
  }
}
