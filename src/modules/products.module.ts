import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from 'src/controllers/product.controller';
import { Product } from 'src/entities/product.entity';
import { ProductsService } from 'src/services/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, Product],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
