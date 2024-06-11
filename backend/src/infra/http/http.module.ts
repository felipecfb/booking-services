import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateEstablishmentController } from './controllers/create-establishment.controller'

import { CreateEstablishmentUseCase } from '@/domain/application/use-cases/create-establishment'

@Module({
  imports: [DatabaseModule],
  controllers: [CreateEstablishmentController],
  providers: [CreateEstablishmentUseCase],
})
export class HttpModule {}
