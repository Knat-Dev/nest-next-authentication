import { UserRole } from "src/server/app/users/user.entity";
export type Provider = 'google' | 'cognito';

export interface User {
  id: number;
  provider: Provider;
  providerId: string;
  username: string;
  email: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}
