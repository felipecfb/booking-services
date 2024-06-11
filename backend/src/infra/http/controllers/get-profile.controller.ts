import {
  BadRequestException,
  Controller,
  Get,
  UnauthorizedException,
} from '@nestjs/common'

import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials-error'
import { GetUserProfileUseCase } from '@/domain/application/use-cases/get-user-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/me')
export class GetProfileController {
  constructor(private getUserProfile: GetUserProfileUseCase) {}

  @Get()
  async handle(@CurrentUser() currentUser: UserPayload) {
    const result = await this.getUserProfile.execute({
      userId: currentUser.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { user } = result.value

    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      establishmentId: user.establishmentId,
      role: user.role,
      createdAt: user.createdAt,
    }
  }
}
