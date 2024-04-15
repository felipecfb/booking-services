import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { RegisterUserUseCase } from './register-client'

let clientsRepository: InMemoryClientsRepository
let sut: RegisterUserUseCase

describe('Create Question', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new RegisterUserUseCase(clientsRepository)
  })

  it('should be able to create a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    console.log(result)
  })
})
