import { Exclude } from 'class-transformer';
import {
  Column,
  Index,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Car from './cars.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Index({ unique: true })
  @Column({ nullable: false, unique: true })
  public email: string;

  @Index({ unique: true })
  @Column({ nullable: false, unique: true })
  public phone_number: string;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column({ nullable: false })
  @Exclude()
  public password: string;

  @Column({ nullable: false })
  public dateOfBirth: Date;

  @OneToOne(() => Car, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public car: Car;
}

export default Driver;
