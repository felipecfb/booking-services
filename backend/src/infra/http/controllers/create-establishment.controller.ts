import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'
import { EstablishmentAlreadyExistsError } from '@/domain/application/use-cases/errors/establishment-already-exists-error'

const createEstablishmentBodySchema = z.object({
  name: z.string().min(4),
  description: z.string().min(10),
  document: z.string().length(14),
})

type CreateEstablishmentBodySchema = z.infer<
  typeof createEstablishmentBodySchema
>

@Controller('/establishments')
@Public()
export class CreateEstablishmentController {
  constructor(private createEstablishment: CreateEstablishmentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createEstablishmentBodySchema))
  async handle(@Body() body: CreateEstablishmentBodySchema) {
    const { name, description, document } = body

    const result = await this.createEstablishment.execute({
      name,
      description,
      document,
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
