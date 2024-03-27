import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemDto } from 'src/dtos/orderItem.dto';
import { OrderItem } from 'src/entities/orderItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  private logger = new Logger(OrderItemsService.name);

  constructor(
    @InjectRepository(OrderItem)
    private _orderItemsRepository: Repository<OrderItem>,
  ) {}

  create(orderItem: OrderItemDto) {
    try {
      return this._orderItemsRepository.create(orderItem);
    } catch (error) {
      this.logger.log(
        `OrderItemsService:create: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<OrderItem[] | undefined> {
    try {
      const orderItems = await this._orderItemsRepository.find();

      if (orderItems?.length == 0) {
        throw new Error('No record found.');
      }
      return orderItems;
    } catch (error) {
      this.logger.log(
        `OrderItemsService:findAll : ${JSON.stringify(error.message)}`,
      );
    }
  }

  async findOne(id: string): Promise<OrderItem | null> {
    try {
      const orderItem = this._orderItemsRepository.findOneBy({ id: id });

      if (!orderItem) {
        throw new Error('Discount not found.');
      }

      return orderItem;
    } catch (error) {
      this.logger.log(
        `OrderItemsService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async update(id: string, discount: OrderItemDto) {
    try {
      await this.findOne(id);
      return this._orderItemsRepository.update(id, discount);
    } catch (error) {
      this.logger.log(
        `DiscountsService:update: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  remove(id: string) {
    return this._orderItemsRepository.delete(id);
  }
}
