import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const cookie = request.cookies['jwt'];
    if (!cookie) return true;
    try {
      const payload = this.jwtService.verify(request.cookies['jwt']);
      if (payload) return false;
    } catch (error) {
      // not authenticated - can go to public pages
      console.log(error);
      return true;
    }
  }
}
