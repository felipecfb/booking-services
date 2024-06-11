import { AuthenticateUserUseCase } from './authenticate-user'
import { makeUser } from 'test/factories/make-user'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { FakeHasher } from 'test/cryptograpy/fake-hasher'
import { FakeEncrypter } from 'test/cryptograpy/fake-encrypter'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    const result = await sut.execute({
      email: 'unexist_user@example.com',
      password: 'unexist_password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
