import { AuthenticateClientUseCase } from './authenticate-client'
import { makeClient } from 'test/factories/make-client'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { FakeHasher } from 'test/cryptograpy/fake-hasher'
import { FakeEncrypter } from 'test/cryptograpy/fake-encrypter'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'

let inMemoryClientsRepository: InMemoryClientsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateClientUseCase

describe('Authenticate Client Use Case', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateClientUseCase(
      inMemoryClientsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a client', async () => {
    const client = makeClient({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
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
      password: 'unexisting_password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
