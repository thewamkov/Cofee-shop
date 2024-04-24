import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { DiscountsModule } from './modules/discounts.module';
import { OrdersModule } from './modules/orders.module';
import { OrderItemsModule } from './modules/orderItems.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options = await configService.get('typeorm');
        if (!options) {
          throw new Error('TypeORM options are undefined');
        }
        return options;
      },
    }),
    UsersModule,
    AuthModule,
    DiscountsModule,
    OrdersModule,
    OrderItemsModule,
  ],
})
export class AppModule {}
