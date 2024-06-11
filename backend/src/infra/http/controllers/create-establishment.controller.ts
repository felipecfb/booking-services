import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'

const createEstablishmentBodySchema = z.object({
  name: z.string().min(4),
  description: z.string().min(10),
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
    const { name, description } = body

    const result = await this.createEstablishment.execute({
      name,
      description,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const establishment = result.value

    console.log(establishment)

    return {
      establishment,
    }
  }
}
