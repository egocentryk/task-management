import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersRepository } from './users.repository'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.JWT_KEY}`,
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload

    const user = await this.usersRepository.findOneBy({ username })

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
