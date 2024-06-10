import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { makeUser } from 'test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it('should return a user profile', async () => {
    const user = makeUser()

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({ userId: user.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should throw if user is not found', async () => {
    const result = await sut.execute({
      userId: 'non-existing-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
