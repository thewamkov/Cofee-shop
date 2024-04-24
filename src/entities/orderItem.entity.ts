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
  Order: Order | null;

  constructor(
    quantity: number,
    unitPrice: number,
    totalPrice: number,
    discount: number,
    order: Order | null,
  ) {
    super();
    this.Quantity = quantity;
    this.UnitPrice = unitPrice;
    this.TotalPrice = totalPrice;
    this.Discount = discount;
    this.Order = order;
  }
}
