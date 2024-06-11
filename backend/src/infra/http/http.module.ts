import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateEstablishmentController } from './controllers/create-establishment.controller'

import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'
import { RegisterUserController } from './controllers/register-user.controller'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateEstablishmentController,
    RegisterUserController,
    AuthenticateController,
  ],
  providers: [
    CreateEstablishmentUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
  ],
})
export class HttpModule {}
