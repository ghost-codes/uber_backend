import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('user-local') {}

@Injectable()
export class LocalDriverAuthenticationGard extends AuthGuard('driver-local') {}
