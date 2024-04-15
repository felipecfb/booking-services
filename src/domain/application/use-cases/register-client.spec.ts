import { compare } from 'bcryptjs'

import { RegisterUserUseCase } from './register-client'

import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'

let clientsRepository: InMemoryClientsRepository
let sut: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new RegisterUserUseCase(clientsRepository)
  })

  it('should be able to register', async () => {
    const { client } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(client.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
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
})
