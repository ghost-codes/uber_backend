import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { mockedConfigService } from '../../utils/mocks/config.service.mock';
import { mockedJwtService } from '../../utils/mocks/jwt.service';

describe('The Authentication Service', () => {
  let authService: AuthService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },

        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();
    authService = await module.get<AuthService>(AuthService);
  });

  describe('when creating cookie', () => {
    it('should return a string ', async () => {
      const userId = 1;
      expect(typeof (await authService.getCookiesJwtToken(userId))).toEqual(
        'string',
      );
    });
  });
});
