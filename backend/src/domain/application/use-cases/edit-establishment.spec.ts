import { InMemoryEstablishmentsRepository } from 'test/repositories/in-memory-establishments-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { EditEstablishmentUseCase } from './edit-establishment'
import { makeEstablishment } from 'test/factories/make-establishment'
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

  it('should be able to edit an establishment', async () => {
    const newUser = makeUser()

    await inMemoryUsersRepository.create(newUser)

    const establishment = makeEstablishment({
      ownerId: newUser.id.toString(),
    })

    await inMemoryEstablishmentsRepository.create(establishment)

    inMemoryUsersRepository.items[0].establishmentId =
      establishment.id.toString()

    const response = await sut.execute({
      establishmentId: establishment.id.toString(),
      userId: newUser.id.toString(),
      name: 'New Name',
      description: 'New Description',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toMatchObject({
      establishment: {
        name: 'New Name',
        description: 'New Description',
      },
    })
  })

  it('should not be able to edit an establishment if user as a member', async () => {
    const owner = makeUser()

    await inMemoryUsersRepository.create(owner)

    const establishment = makeEstablishment({
      ownerId: owner.id.toString(),
    })

    await inMemoryEstablishmentsRepository.create(establishment)

    const member = makeUser({
      establishmentId: establishment.id.toString(),
      role: 'MEMBER',
    })

    await inMemoryUsersRepository.create(member)

    inMemoryUsersRepository.items[0].establishmentId =
      establishment.id.toString()

    const response = await sut.execute({
      establishmentId: establishment.id.toString(),
      userId: member.id.toString(),
      name: 'New Name',
      description: 'New Description',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotAllowedError)
  })
})
