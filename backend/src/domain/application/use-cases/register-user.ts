import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from '@/core/either'
import { User } from '@/domain/enterprise/entities/user'
import { HashGenerator } from '../cryptograpy/hash-generator'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Injectable } from '@nestjs/common'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: passwordHash,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
