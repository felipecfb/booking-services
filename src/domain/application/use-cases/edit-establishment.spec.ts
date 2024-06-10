import { InMemoryEstablishmentsRepository } from 'test/repositories/in-memory-establishments-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditEstablishmentUseCase } from './edit-establishment'
import { makeEstablishment } from 'test/factories/make-establishment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeUser } from 'test/factories/make-user'
import { NotAllowedError } from './errors/not-allowed'

let inMemoryEstablishmentsRepository: InMemoryEstablishmentsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditEstablishmentUseCase

describe('Edit Establishment Use Case', () => {
  beforeEach(() => {
    inMemoryEstablishmentsRepository = new InMemoryEstablishmentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditEstablishmentUseCase(
      inMemoryEstablishmentsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to edit a establishment', async () => {
    const newEstablishment = makeEstablishment(
      {
        name: 'Old Establishment',
        description: 'Old establishment description',
      },
      new UniqueEntityID('establishment-1'),
    )

    await inMemoryEstablishmentsRepository.create(newEstablishment)

    const newUser = makeUser(
      {
        establishmentId: 'establishment-1',
        establishmentRole: 'OWNER',
      },
      new UniqueEntityID('user-1'),
    )

    await inMemoryUsersRepository.create(newUser)

    await sut.execute({
      establishmentId: 'establishment-1',
      userId: 'user-1',
      name: 'New Establishment',
      description: 'New establishment description',
    })

    expect(inMemoryEstablishmentsRepository.items[0]).toMatchObject({
      name: 'New Establishment',
      description: 'New establishment description',
    })
  })

  it('should not be able to edit a establishment if the user is member', async () => {
    const newEstablishment = makeEstablishment(
      {
        name: 'Old Establishment',
        description: 'Old establishment description',
      },
      new UniqueEntityID('establishment-1'),
    )

    await inMemoryEstablishmentsRepository.create(newEstablishment)

    const newUser = makeUser(
      {
        establishmentId: 'establishment-1',
        establishmentRole: 'MEMBER',
      },
      new UniqueEntityID('user-1'),
    )

    await inMemoryUsersRepository.create(newUser)

    const result = await sut.execute({
      establishmentId: 'establishment-1',
      userId: 'user-1',
      name: 'New Establishment',
      description: 'New establishment description',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
