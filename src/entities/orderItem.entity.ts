import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('OrderItem')
export class OrderItem {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  orderItemId!: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @Column()
  TotalPrice: number;

  @Column()
  discount: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
