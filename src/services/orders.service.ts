import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from 'src/dtos/order.dto';
import { Order } from 'src/entities/order.entity';
import { Repository } from 'typeorm';

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
    }
  }

  async findOne(id: string): Promise<Order | null> {
    try {
      const order = this._ordersRepository.findOneBy({ id: id });

      if (!order) {
        throw new Error('Discount not found.');
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

  remove(id: string) {
    return this._ordersRepository.delete(id);
  }
}
