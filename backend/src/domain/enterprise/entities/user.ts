import { Optional } from '@/core/types/optional'
import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  password: string
  establishmentId: string | null
  role: string | null
  createdAt: Date
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get establishmentId() {
    return this.props.establishmentId
  }

  set establishmentId(establishmentId: string | null) {
    this.props.establishmentId = establishmentId
  }

  get role() {
    return this.props.role
  }

  set role(role: string | null) {
    this.props.role = role
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<UserProps, 'establishmentId' | 'role' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const user = new User(
      {
        ...props,
        establishmentId: props.establishmentId ?? null,
        role: props.role ?? null,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
