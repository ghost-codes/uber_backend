import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './stratagies/local.strategy';
import { JwtStrategy } from './stratagies/jwt.strategy';
import { DriverModule } from '../drivers/drivers.module';
import { DriverLocalStrategy } from './stratagies/localDriver.strategy';

@Module({
  imports: [
    UsersModule,
    DriverModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, DriverLocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
