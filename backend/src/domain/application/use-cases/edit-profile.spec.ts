import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { makeUser } from 'test/factories/make-user'
import { EditProfileUseCase } from './edit-profile'
import { EmailInUseError } from './errors/email-in-use-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: EditProfileUseCase

describe('Edit User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new EditProfileUseCase(inMemoryUsersRepository)
  })

  it('should be able to edit an user', async () => {
    const newUser = makeUser()

    await inMemoryUsersRepository.create(newUser)

    const response = await sut.execute({
      userId: newUser.id.toString(),
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toMatchObject({
      user: {
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
    })
  })

  it('should be able to edit an user with email exists', async () => {
    await inMemoryUsersRepository.create(
      makeUser({
        email: 'johndoe@example.com',
      }),
    )

    const newUser = makeUser()

    await inMemoryUsersRepository.create(newUser)

    const response = await sut.execute({
      userId: newUser.id.toString(),
      name: 'John Doe',
      email: 'johndoe@example.com',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(EmailInUseError)
  })
})
