import { UseCaseError } from '@/core/errors/use-case-error'

export class ClientNotAuthorized extends Error implements UseCaseError {
  constructor() {
    super('Client not authorized.')
  }
}
