import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateEstablishmentController } from './controllers/create-establishment.controller'

import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'
import { RegisterUserController } from './controllers/register-user.controller'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user'
import { GetUserProfileController } from './controllers/get-user-profile.controller'
import { GetUserProfileUseCase } from '@/domain/application/use-cases/get-user-profile'
import { EditEstablishmentController } from './controllers/edit-establishment.controller'
import { EditEstablishmentUseCase } from '@/domain/application/use-cases/edit-establishment'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateEstablishmentController,
    RegisterUserController,
    AuthenticateController,
    GetUserProfileController,
    EditEstablishmentController,
  ],
  providers: [
    CreateEstablishmentUseCase,
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    GetUserProfileUseCase,
    EditEstablishmentUseCase,
  ],
})
export class HttpModule {}
