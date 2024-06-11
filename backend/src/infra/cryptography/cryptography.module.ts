import { Module } from '@nestjs/common'

import { BcryptHasher } from './bcrypt-hasher'
import { Encrypter } from '@/domain/application/cryptograpy/encrypter'
import { JwtEncrypter } from './jwt-encrypter'
import { HashComparer } from '@/domain/application/cryptograpy/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptograpy/hash-generator'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter,
    },
    {
      provide: HashComparer,
      useClass: BcryptHasher,
    },
    {
      provide: HashGenerator,
      useClass: BcryptHasher,
    },
  ],
  exports: [Encrypter, HashComparer, HashGenerator],
})
export class CryptographyModule {}
