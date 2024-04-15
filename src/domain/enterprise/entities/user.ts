import { Entity } from '../../../core/entity'
import { UniqueEntityID } from '../../../core/unique-entity-id'

export interface UserProps {
  name: string
  email: string
  password: string
}

export class User extends Entity<UserProps> {
  static create(props: UserProps, id?: UniqueEntityID) {
    const student = new User(props, id)

    return student
  }
}
