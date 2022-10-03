import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import Driver from 'src/features/drivers/entities/drivers.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class DriverLocalStrategy extends PassportStrategy(
  Strategy,
  'driver-local',
) {
  constructor(private authenticationSerrvice: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Driver> {
    return this.authenticationSerrvice.getAuthenticatedDriver(email, password);
  }
}
