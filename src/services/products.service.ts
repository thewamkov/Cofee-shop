import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import {
  DeleteResult,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private _productsRepository: Repository<Product>,
  ) {}

  create(order: ProductDto) {
    try {
      return this._productsRepository.create(order);
    } catch (error) {
      this.logger.log(
        `ProductsService:create: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Product[] | undefined> {
    try {
      const products = await this._productsRepository.find();

      if (products?.length == 0) {
        throw new Error('No record found.');
      }
      return products;
    } catch (error) {
      this.logger.log(
        `ProductsService:findAll : ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      const options: FindOneOptions<Product> = {
        where: { id: id },
      };
      const product = await this._productsRepository.findOne(options);

      if (!product) {
        throw new Error('Product not found.');
      }

      return product;
    } catch (error) {
      this.logger.log(
        `ProductsService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: string, order: ProductDto): Promise<UpdateResult> {
    try {
      await this.findOne(id);
      return await this._productsRepository.update(id, order);
    } catch (error) {
      this.logger.log(`OrdersService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  remove(id: string): Promise<DeleteResult> {
    return this._productsRepository
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
