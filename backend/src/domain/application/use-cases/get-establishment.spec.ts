import { InMemoryEstablishmentsRepository } from 'test/repositories/in-memory-establishments-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { GetEstablishmentUseCase } from './get-establishment'
import { makeEstablishment } from 'test/factories/make-establishment'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEstablishmentsRepository: InMemoryEstablishmentsRepository
let sut: GetEstablishmentUseCase

describe('Get Establishment Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEstablishmentsRepository = new InMemoryEstablishmentsRepository()
    sut = new GetEstablishmentUseCase(inMemoryEstablishmentsRepository)
  })

  it('should be able to get a establishment', async () => {
    const newUser = makeUser()

    inMemoryUsersRepository.items.push(newUser)

    const establishment = makeEstablishment({ ownerId: newUser.id.toString() })

    inMemoryEstablishmentsRepository.items.push(establishment)

    const result = await sut.execute({
      establishmentId: establishment.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      establishment,
    })
  })

  it('should be not be able to get a establishment if it does not exist', async () => {
    const result = await sut.execute({
      establishmentId: 'non-existing-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
