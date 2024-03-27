import { Column, Entity, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { BaseModel } from '../models/base.model';

@Entity('OrderItem')
export class OrderItem extends BaseModel {
  @Column()
  Quantity: number;

  @Column()
  UnitPrice: number;

  @Column()
  TotalPrice: number;

  @Column()
  Discount: number;

  @ManyToOne(() => Order, (order) => order.OrderItems)
  Order: Order;
}
