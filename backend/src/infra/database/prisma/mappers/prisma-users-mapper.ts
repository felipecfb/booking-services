import { User as PrismaUser, Prisma, Role } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/enterprise/entities/user'

export class PrismaUsersMapper {
  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        establishmentId: raw.establishmentId ?? null,
        role: raw.role ?? null,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      establishmentId: user.establishmentId,
      role: user.role as Role,
      createdAt: user.createdAt,
    }
  }
}
