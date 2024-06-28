import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetEstablishmentUseCase } from '@/domain/application/use-cases/get-establishment'
import { PrismaEstablishmentsMapper } from '@/infra/database/prisma/mappers/prisma-establishments-mapper'

@Controller('/establishments/:establishmentId')
export class GetEstablishmentController {
  constructor(private getEstablishment: GetEstablishmentUseCase) {}

  @Get()
  async handle(@Param('establishmentId') establishmentId: string) {
    const result = await this.getEstablishment.execute({
      establishmentId,
    })

    if (result.isLeft()) {
      const error = result.value

      throw new BadRequestException(error.message)
    }

    const { establishment } = result.value

    return PrismaEstablishmentsMapper.toPrisma(establishment)
  }
}
