import { UseCaseError } from '@/core/errors/use-case-error'

export class EstablishmentAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor() {
    super(`Establishment already exists.`)
  }
}
