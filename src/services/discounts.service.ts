import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountDto } from 'src/dtos/discount.dto';
import { Discount } from '../entities/discount.entity';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class DiscountsService {
  private logger = new Logger(DiscountsService.name);

  constructor(
    @InjectRepository(Discount)
    private _discountRepository: Repository<Discount>,
  ) {}

  create(discount: DiscountDto) {
    try {
      return this._discountRepository.create(discount);
    } catch (error) {
      this.logger.log(
        `DiscountsService:create: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Discount[] | undefined> {
    try {
      const discounts = await this._discountRepository.find();

      if (discounts?.length == 0) {
        throw new Error('No record found.');
      }
      return discounts;
    } catch (error) {
      this.logger.log(
        `DiscountsService:findAll : ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<Discount | null> {
    try {
      const options: FindOneOptions<Discount> = {
        where: { id: id },
      };

      const discount = await this._discountRepository.findOne(options);
      if (!discount) {
        throw new Error('Discount not found.');
      }

      return discount;
    } catch (error) {
      this.logger.log(
        `DiscountsService:findOne: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: string, discount: DiscountDto) {
    try {
      await this.findOne(id);
      return this._discountRepository.update(id, discount);
    } catch (error) {
      this.logger.log(
        `DiscountsService:update: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  remove(id: string): Promise<DeleteResult> {
    return this._discountRepository
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
