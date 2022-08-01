import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';

class UserNotFoundException extends NotFoundException {
  constructor(userName: string) {
    super(`User ${userName} not found`);
  }
}
