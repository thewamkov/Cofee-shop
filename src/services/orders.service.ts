import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dtos/order.dto';
import { Order } from '../entities/order.entity';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  private logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(Order)
    private _ordersRepository: Repository<Order>,
  ) {}

  create(order: OrderDto) {
    try {
      return this._ordersRepository.create(order);
    } catch (error) {
      this.logger.log(`OrdersService:create: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<Order[] | undefined> {
    try {
      const orders = await this._ordersRepository.find();

      if (orders?.length == 0) {
        throw new Error('No record found.');
      }
      return orders;
    } catch (error) {
      this.logger.log(
        `OrdersService:findAll : ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findOne(id: string): Promise<Order | null> {
    try {
      const options: FindOneOptions<Order> = {
        where: { id: id },
      };

      const order = await this._ordersRepository.findOne(options);

      if (!order) {
        throw new Error('Order not found.');
      }

      return order;
    } catch (error) {
      this.logger.log(
        `OrdersService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: string, order: OrderDto) {
    try {
      await this.findOne(id);
      return this._ordersRepository.update(id, order);
    } catch (error) {
      this.logger.log(`OrdersService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  remove(id: string): Promise<DeleteResult> {
    return this._ordersRepository
      .delete(id)
      .then((deleteResult) => {
        return deleteResult;
      })
      .catch((error) => {
        this.logger.log(
          `OrdersService:delete: ${JSON.stringify(error.message)}`,
        );
        throw error;
      });
  }
}
