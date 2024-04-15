import { IClientsRepository } from '../repositories/clients-repository'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute({ name, email, password }: RegisterUserUseCaseRequest) {
    const clientWithSameEmail =
      await this.clientsRepository.findClientByEmail(email)

    if (clientWithSameEmail) {
      throw new Error('Client already exists')
    }

    const client = await this.clientsRepository.create({
      name,
      email,
      password,
    })

    return {
      client,
    }
  }
}