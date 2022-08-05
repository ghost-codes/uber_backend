import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../entities/users.entity';
import { UsersService } from '../users.service';

describe('The User Service', () => {
  let userService: UsersService;
  let findOneBy: jest.Mock;
  beforeAll(async () => {
    findOneBy = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy,
          },
        },
      ],
    }).compile();
    userService = module.get(UsersService);
  });

  describe('when getting a user by email', () => {
    describe('and the user is matched', () => {
      let user: User;
      beforeEach(() => {
        user = new User();
        findOneBy.mockReturnValue(Promise.resolve(user));
      });

      it('should retrun the user', async () => {
        const fetchedUser = await userService.getByEmail('test@test.com');
        expect(fetchedUser).toEqual(user);
      });
    });

    describe('and the user is matched', () => {
      beforeEach(() => {
        findOneBy.mockReturnValue(undefined);
      });

      it('should throw an error', async () => {
        await expect(userService.getByEmail('test@test.com')).rejects.toThrow();
      });
    });
  });
});
