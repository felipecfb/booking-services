import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { EstablishmentsRepository } from '@/domain/application/repositories/establishments-repository'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { PrismaEstablishmentsRepository } from './prisma/repositories/prisma-establishments-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: EstablishmentsRepository,
      useClass: PrismaEstablishmentsRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, EstablishmentsRepository, UsersRepository],
})
export class DatabaseModule {}
