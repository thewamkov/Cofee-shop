import { Column, Entity, OneToOne } from 'typeorm';
import { Product } from './product.entity';
import { BaseModel } from 'models/base.model';

@Entity('Discount')
export class Discount extends BaseModel {
  @Column()
  DiscountPercentage: number;

  @Column({ type: 'date' })
  StartDate: string;

  @Column({ type: 'date' })
  EndDate: string;

  @OneToOne(() => Product)
  Product: Product;
}
