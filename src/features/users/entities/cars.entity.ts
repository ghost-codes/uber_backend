import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Driver from './drivers.entity';

@Entity()
class Car {
  @PrimaryGeneratedColumn()
  public id?: number;

  @OneToOne(() => Driver, (driver) => driver.car)
  public driver: Driver;
}

export default Car;
