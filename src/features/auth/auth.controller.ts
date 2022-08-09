import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import DriverRegistrationDto from './dto/driverRegistration.dto';
import LoginDto from './dto/logindto';
import RegistrationDto from './dto/registration.dto';
import {
  JwtAuthenticationGuard,
  DriverJwtAuthenticationGuard,
} from './guards/jwtAuthentication.guard';
import {
  LocalAuthenticationGuard,
  LocalDriverAuthenticationGard,
} from './guards/localAuthentication.guard';
import RequestWithUser from './interfaces/requestWithUser.interface'; // RequestWithDriver,

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(DriverJwtAuthenticationGuard)
  @Get('driver')
  driverAuthenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  async register(@Body() registrationData: RegistrationDto) {
    return this.authenticationService.register(registrationData);
  }

  @Post('driver/register')
  @UseInterceptors(ClassSerializerInterceptor)
  async registerDriver(@Body() registrationData: DriverRegistrationDto) {
    return this.authenticationService.registerDriver(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = await this.authenticationService.getCookiesJwtToken(user.id);
    request.res.setHeader('Set-Cookies', cookie);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalDriverAuthenticationGard)
  @Post('driver/log-in')
  async driverLogIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = await this.authenticationService.getCookiesJwtToken(user.id);
    request.res.setHeader('Set-Cookies', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookeForLogout(),
    );
    return response.sendStatus(200);
  }
  @UseGuards(DriverJwtAuthenticationGuard)
  @Post('driver/log-out')
  async DriverlogOut(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookeForLogout(),
    );
    return response.sendStatus(200);
  }
}
