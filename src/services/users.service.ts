import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      return this._userRepository.create(createUserDto);
    } catch (error) {
      this.logger.log(`UsersService:create: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<User[] | undefined> {
    try {
      const users = await this._userRepository.find();

      if (users?.length == 0) {
        throw new Error('No record found.');
      }
      return users;
    } catch (error) {
      this.logger.log(
        `UsersService:findAll : ${JSON.stringify(error.message)}`,
      );
    }
  }

  async findOne(id: string): Promise<User | null> {
    try {
      const user = this._userRepository.findOneBy({ id: id });

      if (!user) {
        throw new Error('User not found.');
      }

      return user;
    } catch (error) {
      this.logger.log(
        `UsersService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.findOne(id);
      return this._userRepository.update(id, updateUserDto);
    } catch (error) {
      this.logger.log(`UsersService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  remove(id: string): Promise<DeleteResult> {
    return this._userRepository
      .delete(id)
      .then((deleteResult) => {
        return deleteResult;
      })
      .catch((error) => {
        this.logger.log(
          `DiscountsService:delete: ${JSON.stringify(error.message)}`,
        );
        throw error;
      });
  }
}
