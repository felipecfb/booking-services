import { InMemoryEstablishmentsRepository } from 'test/repositories/in-memory-establishments-repository'
import { CreateEstablishmentUseCase } from './create-establishment'

let inMemoryEstablishmentsRepository: InMemoryEstablishmentsRepository
let sut: CreateEstablishmentUseCase

describe('Create Establishment Use Case', () => {
  beforeEach(() => {
    inMemoryEstablishmentsRepository = new InMemoryEstablishmentsRepository()
    sut = new CreateEstablishmentUseCase(inMemoryEstablishmentsRepository)
  })

  it('should be able to create a establishment', async () => {
    const result = await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryEstablishmentsRepository.items[0]).toEqual(
      result.value?.establishment,
    )
  })
})
