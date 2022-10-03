import { Request } from 'express';
import Driver from 'src/features/drivers/entities/drivers.entity';
import User from 'src/features/users/entities/users.entity';

export interface RequestWithUser extends Request {
  user: User | Driver;
}

export default RequestWithUser;
