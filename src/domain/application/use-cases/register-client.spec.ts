import { compare } from 'bcryptjs'

import { RegisterClientUseCase } from './register-client'

import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'

let clientsRepository: InMemoryClientsRepository
let sut: RegisterClientUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new RegisterClientUseCase(clientsRepository)
  })

  it('should be able to register', async () => {
    const { client } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(client.id).toEqual(expect.any(String))
  })

  it('should hash client password upon registration', async () => {
    const { client } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare('123456', client.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'sameemail@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should regular client upon registration', async () => {
    const { client } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(client.role).toEqual('REGULAR')
  })
})
