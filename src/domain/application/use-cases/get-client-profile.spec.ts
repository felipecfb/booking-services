import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { GetClientProfileUseCase } from './get-client-profile'

let clientsRepository: InMemoryClientsRepository
let sut: GetClientProfileUseCase

describe('Get Client Profile Use Case', () => {
  beforeEach(() => {
    clientsRepository = new InMemoryClientsRepository()
    sut = new GetClientProfileUseCase(clientsRepository)
  })

  it('should return a user profile', async () => {
    const client = await clientsRepository.create({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    })

    const response = await sut.execute({ clientId: client.id })

    expect(response).toEqual({
      id: client.id,
      name: client.name,
      email: client.email,
      role: client.role,
      createdAt: client.createdAt,
    })
  })

  it('should throw if user is not found', async () => {
    await expect(sut.execute({ clientId: 'invalid_id' })).rejects.toThrow(
      'Client not found',
    )
  })
})
