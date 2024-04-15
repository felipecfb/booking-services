import { IClientsRepository } from '../repositories/clients-repository'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private clientsRepository: IClientsRepository) {}

  async execute({ name, email, password }: RegisterUserUseCaseRequest) {
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
