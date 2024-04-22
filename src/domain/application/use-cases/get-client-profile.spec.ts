import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { GetClientProfileUseCase } from './get-client-profile'
import { makeClient } from 'test/factories/make-client'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryClientsRepository: InMemoryClientsRepository
let sut: GetClientProfileUseCase

describe('Get Client Profile Use Case', () => {
  beforeEach(() => {
    inMemoryClientsRepository = new InMemoryClientsRepository()
    sut = new GetClientProfileUseCase(inMemoryClientsRepository)
  })

  it('should return a client profile', async () => {
    const client = makeClient()

    await inMemoryClientsRepository.create(client)

    const result = await sut.execute({ clientId: client.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      client: inMemoryClientsRepository.items[0],
    })
  })

  it('should throw if client is not found', async () => {
    const result = await sut.execute({
      clientId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
