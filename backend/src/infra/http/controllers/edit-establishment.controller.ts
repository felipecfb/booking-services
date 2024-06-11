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
import { EditEstablishmentUseCase } from '@/domain/application/use-cases/edit-establishment'
import { EstablishmentAlreadyExistsError } from '@/domain/application/use-cases/errors/establishment-already-exists-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const editEstablishmentBodySchema = z.object({
  name: z.string().min(4),
  description: z.string().min(10),
})

const bodyValidationPipe = new ZodValidationPipe(editEstablishmentBodySchema)

type EditEstablishmentBodySchema = z.infer<typeof editEstablishmentBodySchema>

@Controller('/establishments/:establishmentId')
export class EditEstablishmentController {
  constructor(private editEstablishment: EditEstablishmentUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Param('establishmentId') establishmentId: string,
    @Body(bodyValidationPipe) body: EditEstablishmentBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, description } = body
    const userId = user.sub

    const result = await this.editEstablishment.execute({
      establishmentId,
      userId,
      name,
      description,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case EstablishmentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
