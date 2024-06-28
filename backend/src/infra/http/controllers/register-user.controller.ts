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
import { Public } from '@/infra/auth/public'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { EstablishmentAlreadyExistsError } from '@/domain/application/use-cases/errors/establishment-already-exists-error'

const registerUserBodySchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(6),
})

const bodyValidationPipe = new ZodValidationPipe(registerUserBodySchema)

type RegisterUserBodySchema = z.infer<typeof registerUserBodySchema>

@Controller('/users')
@Public()
export class RegisterUserController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: RegisterUserBodySchema) {
    const { name, email, password } = body

    const result = await this.registerUser.execute({
      name,
      email,
      password,
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
