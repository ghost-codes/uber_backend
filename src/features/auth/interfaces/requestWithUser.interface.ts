import { Request } from 'express';
import User from 'src/features/users/entities/users.entity';

export interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
