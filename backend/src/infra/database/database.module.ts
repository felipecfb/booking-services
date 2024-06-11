import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { EstablishmentsRepository } from '@/domain/application/repositories/establishments-repository'
import { PrismaEstablishmentsRepository } from './prisma/repositories/prisma-establishments-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: EstablishmentsRepository,
      useClass: PrismaEstablishmentsRepository,
    },
  ],
  exports: [PrismaService, EstablishmentsRepository],
})
export class DatabaseModule {}
