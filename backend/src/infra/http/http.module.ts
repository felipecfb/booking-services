import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateEstablishmentController } from './controllers/create-establishment.controller'

import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'
import { RegisterUserController } from './controllers/register-user.controller'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user'
import { GetProfileController } from './controllers/get-profile.controller'
import { GetUserProfileUseCase } from '@/domain/application/use-cases/get-user-profile'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateEstablishmentController,
    RegisterUserController,
    AuthenticateController,
    GetProfileController,
  ],
  providers: [
    CreateEstablishmentUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    GetUserProfileUseCase,
  ],
})
export class HttpModule {}
