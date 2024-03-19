import { BaseModel } from 'models/base.model';
import { Column, Entity } from 'typeorm';

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
}
