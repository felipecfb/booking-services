import { UseCaseError } from '@/core/errors/use-case-error'

export class EmailInUseError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User with email "${identifier}" already exists.`)
  }
}
