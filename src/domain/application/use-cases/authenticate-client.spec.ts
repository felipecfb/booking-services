import { hash } from 'bcryptjs'
import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { AuthenticateClientUseCase } from './authenticate-client'

let clientsRepository: InMemoryClientsRepository
let sut: AuthenticateClientUseCase

describe('Authenticate Client Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new AuthenticateClientUseCase(clientsRepository)
  })

  it('should be able to authenticate a client', async () => {
    const client = await clientsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: await hash('any_password', 8),
    })

    const result = await sut.execute({
      email: client.email,
      password: 'any_password',
    })

    expect(result).toEqual({
      accessToken: expect.any(String),
    })
  })
})
