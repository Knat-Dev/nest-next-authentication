import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/server/common/types/user';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    return ctx.switchToHttp().getRequest().user;
  },
);
