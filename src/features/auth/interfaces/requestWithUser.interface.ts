import { Request } from 'express';
import User from 'src/features/users/users.entity';

export interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
