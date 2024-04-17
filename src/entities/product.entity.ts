import { BaseModel } from '../models/base.model';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Discount } from './discount.entity';

@Entity('Product')
export class Product extends BaseModel {
  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  Price: number;

  @Column()
  StockQuantity: number;

  @ManyToOne(() => Discount, (discount) => discount.Products)
  @JoinColumn()
  Discount?: Discount | null;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stockQuantity: number,
    discount: Discount | null,
  ) {
    super();
    this.id = id;
    this.Name = name;
    this.Description = description;
    this.Price = price;
    this.StockQuantity = stockQuantity;
    this.Discount = discount;
  }
}
