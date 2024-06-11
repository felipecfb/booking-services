import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateEstablishmentController } from './controllers/create-establishment.controller'

import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'
import { RegisterUserController } from './controllers/register-user.controller'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [CreateEstablishmentController, RegisterUserController],
  providers: [CreateEstablishmentUseCase, RegisterUserUseCase],
})
export class HttpModule {}
