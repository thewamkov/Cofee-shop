import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.get('DATABASE_USERNAME'),
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        password: configService.get('DATABASE_PASSWORD'),
        synchronize: false,
        autoLoadEntities: true,
        migrationsTableName: 'custom_migration_table',
        migrations: ['dist/migrations/*.js'],
        migrationsRun: false,
        entities: [Role, User],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
