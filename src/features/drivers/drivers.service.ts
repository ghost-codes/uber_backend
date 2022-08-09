import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateDriverDTO from './dto/createDriver.dto';
import Driver from './entities/drivers.entity';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async getByEmail(email: string) {
    const user = await this.driverRepository.findOneBy({ email });
    if (user) return user;
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getById(userId: number) {
    const user = await this.driverRepository.findOneBy({ id: userId });
    if (user) return user;
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async create(driverData: CreateDriverDTO) {
    const newDriver = await this.driverRepository.create(driverData);
    await this.driverRepository.save(newDriver);
    return newDriver;
  }
}
