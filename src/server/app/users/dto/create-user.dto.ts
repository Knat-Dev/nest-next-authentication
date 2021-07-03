import { Provider } from 'src/server/common/types/user';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  email: string;
  username: string;
}
