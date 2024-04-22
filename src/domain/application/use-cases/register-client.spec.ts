import { RegisterClientUseCase } from './register-client'

import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { compare } from 'bcryptjs'
import { ClientAlreadyExistsError } from './errors/client-already-exists-error'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: RegisterClientUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new RegisterClientUseCase(inMemoryClientsRepository)
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

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      inMemoryClientsRepository.items[0].password,
    )

    expect(result.isRight()).toBe(true)
    expect(isPasswordCorrectlyHashed).toBe(true)
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
