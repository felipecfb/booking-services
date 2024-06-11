import { InMemoryEstablishmentsRepository } from 'test/repositories/in-memory-establishments-repository'
import { CreateEstablishmentUseCase } from './create-establishment'
import { EstablishmentAlreadyExistsError } from './errors/establishment-already-exists-error'

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
      document: '12345678901234',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      establishment: inMemoryEstablishmentsRepository.items[0],
    })
  })

  it('should not be able to create a establishment with same document', async () => {
    await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
      document: '12345678901234',
    })

    const result = await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
      document: '12345678901234',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(EstablishmentAlreadyExistsError)
  })
})
