import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaUsersMapper } from '../mappers/prisma-users-mapper'
import { UsersRepository } from '@/domain/application/repositories/users-repository'
import { User } from '@/domain/enterprise/entities/user'
import { Role } from '@prisma/client'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return PrismaUsersMapper.toDomain(user)
  }

  async create(user: User): Promise<void> {
    const data = PrismaUsersMapper.toPrisma(user)

    await this.prisma.user.create({
      data,
    })
  }

  async updateRole(user: User, role: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: user.id.toString(),
      },
      data: {
        role: role as Role,
      },
    })
  }
}
