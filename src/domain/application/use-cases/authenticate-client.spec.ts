import { hash } from 'bcryptjs'
import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { AuthenticateClientUseCase } from './authenticate-client'
import { makeClient } from 'test/factories/make-client'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: AuthenticateClientUseCase

describe('Authenticate Client Use Case', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new AuthenticateClientUseCase(inMemoryClientsRepository)
  })

  it('should be able to authenticate a client', async () => {
    const client = makeClient({
      email: 'johndoe@example.com',
      password: await hash('123456', 8),
    })

    inMemoryClientsRepository.create(client)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    const result = await sut.execute({
      email: 'unexist_client@example.com',
      password: '123456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
