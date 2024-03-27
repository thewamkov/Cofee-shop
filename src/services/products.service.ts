import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from 'src/dtos/product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private _ordersRepository: Repository<Product>,
  ) {}

  create(order: ProductDto) {
    try {
      return this._ordersRepository.create(order);
    } catch (error) {
      this.logger.log(
        `ProductsService:create: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Product[] | undefined> {
    try {
      const products = await this._ordersRepository.find();

      if (products?.length == 0) {
        throw new Error('No record found.');
      }
      return products;
    } catch (error) {
      this.logger.log(
        `ProductsService:findAll : ${JSON.stringify(error.message)}`,
      );
    }
  }

  async findOne(id: string): Promise<Product | null> {
    try {
      const product = this._ordersRepository.findOneBy({ id: id });

      if (!product) {
        throw new Error('Discount not found.');
      }

      return product;
    } catch (error) {
      this.logger.log(
        `ProductsService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: string, order: ProductDto) {
    try {
      await this.findOne(id);
      return this._ordersRepository.update(id, order);
    } catch (error) {
      this.logger.log(`OrdersService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  remove(id: string) {
    return this._ordersRepository.delete(id);
  }
}
