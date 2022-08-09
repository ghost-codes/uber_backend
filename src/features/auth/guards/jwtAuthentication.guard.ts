import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('user-jwt') {}
@Injectable()
export class DriverJwtAuthenticationGuard extends AuthGuard('driver-jwt') {}
