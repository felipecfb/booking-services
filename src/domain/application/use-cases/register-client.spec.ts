import { RegisterClientUseCase } from './register-client'

import { ClientAlreadyExistsError } from './errors/client-already-exists-error'
import { FakeHasher } from 'test/cryptograpy/fake-hasher'
import { InMemoryClientsRepository } from 'test/repositories/in-memory-clients-repository'

let inMemoryClientsRepository: InMemoryClientsRepository
let fakeHasher: FakeHasher
let sut: RegisterClientUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterClientUseCase(inMemoryClientsRepository, fakeHasher)
  })

  it('should be able to register a new client', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      client: inMemoryClientsRepository.items[0],
    })
  })

  it('should hash client password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryClientsRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'sameemail@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    const result = await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new ClientAlreadyExistsError(email))
  })

  it('should regular client upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      client: expect.objectContaining({
        role: 'REGULAR',
      }),
    })
  })
})
