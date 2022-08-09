import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Driver from './drivers.entity';

@Entity()
class Car {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ nullable: false })
  public registrationNumber: string;

  @Column({ nullable: false })
  public color: string;

  @OneToOne(() => Driver, (driver) => driver.car)
  public driver: Driver;
}

export default Car;
