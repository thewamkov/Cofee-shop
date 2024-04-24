import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Role } from './src/entities/role.entity';
import { User } from './src/entities/user.entity';
import { Discount } from './src/entities/discount.entity';
import { Order } from './src/entities/order.entity';
import { OrderItem } from './src/entities/orderItem.entity';
import { Product } from './src/entities/product.entity';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [Role, User, Discount, Order, OrderItem, Product],
});
