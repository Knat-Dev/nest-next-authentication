import { CanActivate, ExecutionContext, ForbiddenException, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User, UserRole } from '../users/user.entity';

export const RoleGuard = (role: UserRole) => {
  class RoleGuardMixin implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
      const user: User = req.user;
      if (user.role === UserRole.Admin) return true;
      else throw new ForbiddenException("Only admins can create posts");
    }
  }
  const guard = mixin(RoleGuardMixin);
  return guard;
};
