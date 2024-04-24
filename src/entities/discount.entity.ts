import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { BaseModel } from '../models/base.model';

@Entity('Discount')
export class Discount extends BaseModel {
  @Column()
  DiscountPercentage: number;

  @Column({ type: 'date' })
  StartDate: string;

  @Column({ type: 'date' })
  EndDate: string;

  @OneToMany(() => Product, (product) => product.Discount)
  Products: Product[];

  constructor(
    discountPercentage: number,
    startDate: string,
    endDate: string,
    products: Product[] = [],
  ) {
    super();
    this.DiscountPercentage = discountPercentage;
    this.StartDate = startDate;
    this.EndDate = endDate;
    this.Products = products;
  }
}
