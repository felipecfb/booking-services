import { InMemoryEstablishmentsRepository } from 'test/repositories/in-memory-establishments-repository'
import { CreateEstablishmentUseCase } from './create-establishment'
import { EstablishmentAlreadyExistsError } from './errors/establishment-already-exists-error'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { NotAllowedError } from './errors/not-allowed'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEstablishmentsRepository: InMemoryEstablishmentsRepository
let sut: CreateEstablishmentUseCase

describe('Create Establishment Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEstablishmentsRepository = new InMemoryEstablishmentsRepository()
    sut = new CreateEstablishmentUseCase(
      inMemoryUsersRepository,
      inMemoryEstablishmentsRepository,
    )
  })

  it('should be able to create a establishment', async () => {
    const newUser = makeUser()

    inMemoryUsersRepository.items.push(newUser)

    const result = await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
      document: '12345678901234',
      ownerId: newUser.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      establishment: inMemoryEstablishmentsRepository.items[0],
    })
  })

  it('should be able to update user role to OWNER', async () => {
    const newUser = makeUser()

    inMemoryUsersRepository.items.push(newUser)

    await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
      document: '12345678901234',
      ownerId: newUser.id.toString(),
    })

    expect(inMemoryUsersRepository.items[0].role).toBe('OWNER')
  })

  it('should be able to add user to establishment', async () => {
    const newUser = makeUser()

    inMemoryUsersRepository.items.push(newUser)

    await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
      document: '12345678901234',
      ownerId: newUser.id.toString(),
    })

    expect(inMemoryEstablishmentsRepository.items[0].users).toHaveLength(1)
  })

  it('should not be able to create a establishment if user has another establishment', async () => {
    const newUser = makeUser()

    inMemoryUsersRepository.items.push(newUser)

    await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
      document: '12345678901234',
      ownerId: newUser.id.toString(),
    })

    const result = await sut.execute({
      name: 'Establishment 2',
      description: 'Establishment description',
      document: '12345678901233',
      ownerId: newUser.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to create a establishment with same document', async () => {
    const newUser = makeUser()
    const anotherUser = makeUser()

    inMemoryUsersRepository.items.push(newUser)
    inMemoryUsersRepository.items.push(anotherUser)

    await sut.execute({
      name: 'Establishment 1',
      description: 'Establishment description',
      document: '12345678901234',
      ownerId: newUser.id.toString(),
    })

    const result = await sut.execute({
      name: 'Establishment 2',
      description: 'Establishment description',
      document: '12345678901234',
      ownerId: anotherUser.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(EstablishmentAlreadyExistsError)
  })
})
