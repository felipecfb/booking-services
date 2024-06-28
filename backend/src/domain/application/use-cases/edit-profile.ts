import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { Injectable } from '@nestjs/common'
import { User } from '@/domain/enterprise/entities/user'
import { EmailInUseError } from './errors/email-in-use-error'

interface EditProfileUseCaseRequest {
  userId: string
  name: string
  email: string
}

type EditProfileUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

@Injectable()
export class EditProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
  }: EditProfileUseCaseRequest): Promise<EditProfileUseCaseResponse> {
    const user = await this.usersRepository.findUserById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const emailAlreadyExists = await this.usersRepository.findUserByEmail(email)

    if (emailAlreadyExists) {
      return left(new EmailInUseError(email))
    }

    user.name = name
    user.email = email

    return right({
      user,
    })
  }
}
