import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { appConfig } from '../configuration/configs/app-config';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly authHeaderSecret: string;
  constructor(@Inject(appConfig.KEY) private readonly appConfigToken: ConfigType<typeof appConfig>) {
    const { AUTH_HEADER_SECRET } = this.appConfigToken;
    this.authHeaderSecret = AUTH_HEADER_SECRET;
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.auth;
    return authHeader === this.authHeaderSecret;
  }
}
