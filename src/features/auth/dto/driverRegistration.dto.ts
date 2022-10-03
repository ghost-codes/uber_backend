import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsObject,
  IsNotEmptyObject,
} from 'class-validator';

export class CarRegistrationDto {
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}

export class DriverRegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsObject()
  @IsNotEmptyObject()
  car: CarRegistrationDto;
}

export default DriverRegistrationDto;
