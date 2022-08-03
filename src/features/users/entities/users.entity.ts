import { Exclude } from 'class-transformer';
import { Column, Index, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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
}

export default User;
