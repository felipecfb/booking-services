import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { FetchUsersEstablishmentUseCase } from './fetch-users-establishment'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: FetchUsersEstablishmentUseCase

describe('Fetch Users Establishment Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersEstablishmentUseCase(inMemoryUsersRepository)
  })

  it('should be able to fetch users establishment', async () => {
    await inMemoryUsersRepository.create(
      makeUser({
        establishmentId: 'establishment-id',
        role: 'OWNER',
      }),
    )

    await inMemoryUsersRepository.create(
      makeUser({
        establishmentId: 'establishment-id',
        role: 'ADMIN',
      }),
    )

    await inMemoryUsersRepository.create(
      makeUser({
        establishmentId: 'establishment-id',
        role: 'MEMBER',
      }),
    )

    const result = await sut.execute({
      establishmentId: 'establishment-id',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.users).toHaveLength(3)
  })

  it('should be able to fetch paginated users establishment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryUsersRepository.create(
        makeUser({
          establishmentId: 'establishment-id',
          role: 'MEMBER',
        }),
      )
    }

    const result = await sut.execute({
      establishmentId: 'establishment-id',
      page: 2,
    })

    expect(result.value?.users).toHaveLength(2)
  })
})
