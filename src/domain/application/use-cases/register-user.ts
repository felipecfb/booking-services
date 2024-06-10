import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from '@/core/either'
import { User } from '@/domain/enterprise/entities/user'
import { HashGenerator } from '../cryptograpy/hash-generator'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { EstablishmentsRepository } from '../repositories/establishments-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  establishmentId: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(
    private establishmentsRepository: EstablishmentsRepository,
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
    establishmentId,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const establishment =
      await this.establishmentsRepository.findEstablishmentById(establishmentId)

    if (!establishment) {
      return left(new ResourceNotFoundError('Establishment not found'))
    }

    const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: passwordHash,
      establishmentId,
      establishmentRole: establishment.users?.length === 0 ? 'OWNER' : 'MEMBER',
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
