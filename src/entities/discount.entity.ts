import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity('Discount')
export class Discount {
  @PrimaryGeneratedColumn('identity', {
    generatedIdentity: 'ALWAYS',
  })
  discountId!: string;

  @Column()
  discountPercentage: number;

  @OneToOne(() => Product)
  product: Product;
}
