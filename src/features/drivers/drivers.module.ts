import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversService } from './drivers.service';
import Car from './entities/cars.entity';
import Driver from './entities/drivers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Car])],
  providers: [DriversService],
  exports: [DriversService],
})
export class DriverModule {}
