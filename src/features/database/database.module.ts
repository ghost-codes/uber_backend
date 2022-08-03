import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Car from '../users/entities/cars.entity';
import Driver from '../users/entities/drivers.entity';
import User from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          // __dirname + '/../**/*.entity.ts',
          User,
          Driver,
          Car,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
