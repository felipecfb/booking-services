import { FakeHasher } from 'test/cryptograpy/fake-hasher'
import { RegisterUserUseCase } from './register-user'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { InMemoryEstablishmentsRepository } from 'test/repositories/in-memory-establishments-repository'
import { makeEstablishment } from 'test/factories/make-establishment'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

let inMemoryEstablishmentsRepository: InMemoryEstablishmentsRepository
let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    inMemoryEstablishmentsRepository = new InMemoryEstablishmentsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(
      inMemoryEstablishmentsRepository,
      inMemoryUsersRepository,
      fakeHasher,
    )
  })

  it('should be able to register a new user', async () => {
    const establishment = makeEstablishment()

    await inMemoryEstablishmentsRepository.create(establishment)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      establishmentId: establishment.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should hash user password upon registration', async () => {
    const establishment = makeEstablishment()

    await inMemoryEstablishmentsRepository.create(establishment)

    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      establishmentId: establishment.id.toString(),
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUsersRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register with same email twice', async () => {
    const establishment = makeEstablishment()

    await inMemoryEstablishmentsRepository.create(establishment)

    const email = 'sameemail@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      establishmentId: establishment.id.toString(),
    })

    const result = await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      establishmentId: establishment.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(new UserAlreadyExistsError(email))
  })

  it('should not be able to register with non-existing establishment', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      establishmentId: 'non-existing-establishment-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toEqual(
      new ResourceNotFoundError('Establishment not found'),
    )
  })
})
