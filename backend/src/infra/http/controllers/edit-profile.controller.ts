import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { EditProfileUseCase } from '@/domain/application/use-cases/edit-profile'
import { EmailInUseError } from '@/domain/application/use-cases/errors/email-in-use-error'

const editProfileBodySchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
})

const bodyValidationPipe = new ZodValidationPipe(editProfileBodySchema)

type EditProfileBodySchema = z.infer<typeof editProfileBodySchema>

@Controller('/users')
export class EditProfileController {
  constructor(private editProfile: EditProfileUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('id') id: string,
    @Body(bodyValidationPipe) body: EditProfileBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, email } = body
    const userId = user.sub

    const result = await this.editProfile.execute({
      userId,
      name,
      email,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EmailInUseError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
