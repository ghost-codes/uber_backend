import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/features/users/users.service';
import { Request } from 'express';
import TokenPayload from '../interfaces/tokenPayload.interface';
import { DriversService } from 'src/features/drivers/drivers.service';

@Injectable()
export class DriverJwtStrategy extends PassportStrategy(
  Strategy,
  'driver-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly driverService: DriversService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    console.log(payload);
    return await this.driverService.getById(payload.clientId);
  }
}
