import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'
import { EstablishmentAlreadyExistsError } from '@/domain/application/use-cases/errors/establishment-already-exists-error'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const createEstablishmentBodySchema = z.object({
  name: z.string().min(4),
  description: z.string().min(10),
  document: z.string().length(14),
})

const bodyValidationPipe = new ZodValidationPipe(createEstablishmentBodySchema)

type CreateEstablishmentBodySchema = z.infer<
  typeof createEstablishmentBodySchema
>

@Controller('/establishments')
export class CreateEstablishmentController {
  constructor(private createEstablishment: CreateEstablishmentUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateEstablishmentBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, description, document } = body
    const ownerId = user.sub

    const result = await this.createEstablishment.execute({
      name,
      description,
      document,
      ownerId,
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
