import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const createUser = (
    UserName: string,
    Email: string,
    Password: string,
    Address: string,
    Phone: string,
    Role: any,
  ) => {
    return new User(UserName, Email, Password, Address, Phone, Role);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token when valid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const role: Role = new Role('test');
      const user = createUser(
        username,
        'mail@gmail.com',
        password,
        'test address',
        '0987654321',
        role,
      );

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(user);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce('mockedAccessToken');

      const result = await authService.signIn(username, password);
      expect(result.access_token).toEqual('mockedAccessToken');
    });

    it('should throw UnauthorizedException when invalid credentials are provided', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const role: Role = new Role('test');
      const user = createUser(
        username,
        'mail@gmail.com',
        'wrongpassword',
        'test address',
        '0987654321',
        role,
      );

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(user);

      await expect(authService.signIn(username, password)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
