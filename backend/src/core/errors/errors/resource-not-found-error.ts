import { UseCaseError } from '@/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(message?: string) {
    message ? super(message) : super('Resource not found')
  }
}
