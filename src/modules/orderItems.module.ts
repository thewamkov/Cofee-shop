import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsController } from 'src/controllers/ordersItem.controller';
import { OrderItem } from 'src/entities/orderItem.entity';
import { OrderItemsService } from 'src/services/orderItem.service';

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
  imports: [TypeOrmModule.forFeature([OrderItem])],
})
export class OrderItemsModule {}
