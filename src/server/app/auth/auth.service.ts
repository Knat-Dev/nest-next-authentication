import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private userSService: UsersService) {}
  async me(userId: number) {
    return this.userSService.findOne(userId);
  }
}
