import { CarRegistrationDto } from 'src/features/auth/dto/driverRegistration.dto';
import Car from '../entities/cars.entity';

export class CreateDriverDTO {
  email: string;
  firstname: string;
  phone_number: string;
  lastname: string;
  password: string;
  car: CarRegistrationDto;
}

export default CreateDriverDTO;
