import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './orderItem.entity';
import { BaseModel } from '../models/base.model';

@Entity('Order')
export class Order extends BaseModel {
  @Column()
  TotalPrice: number;

  @Column()
  Discount: number;

  @OneToOne(() => User)
  User: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.Order)
  OrderItems: OrderItem[];

  constructor(
    totalPrice: number,
    discount: number,
    user: User,
    orderItems: OrderItem[] = [],
  ) {
    super();
    this.TotalPrice = totalPrice;
    this.Discount = discount;
    this.User = user;
    this.OrderItems = orderItems;
  }
}
