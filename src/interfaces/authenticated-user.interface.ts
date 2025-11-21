import { Role } from 'src/usuarios/constant/role.enum';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: Role;
  };
}
