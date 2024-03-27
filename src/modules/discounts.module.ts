import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountsController } from 'src/controllers/discounts.controller';
import { Discount } from 'src/entities/discount.entity';
import { DiscountsService } from 'src/services/discounts.service';

@Module({
  controllers: [DiscountsController],
  providers: [DiscountsService],
  exports: [DiscountsService],
  imports: [TypeOrmModule.forFeature([Discount])],
})
export class DiscountsModule {}
