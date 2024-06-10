import { Optional } from '@/core/types/optional'
import { Entity } from '../../../core/entities/entity'
import { UniqueEntityID } from '../../../core/entities/unique-entity-id'
import { Slug } from './value-objects/slug'

export interface ServiceProps {
  clientId: UniqueEntityID
  name: string
  description: string
  price: number
  disponibility: boolean
  slug: Slug
  createdAt: Date
}

export class Service extends Entity<ServiceProps> {
  get clientId() {
    return this.props.clientId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get price() {
    return this.props.price
  }

  get disponibility() {
    return this.props.disponibility
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<ServiceProps, 'disponibility' | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const service = new Service(
      {
        ...props,
        disponibility: props.disponibility ?? true,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return service
  }
}
