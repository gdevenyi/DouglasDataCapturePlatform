import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

import { RouteAccess } from '@/core/decorators/route-access.decorator';

@ApiTags('Authentication')
@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Request an access token using credentials' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @RouteAccess('public')
  login(@Body() { username, password }: LoginCredentialsDto): Promise<AccessTokenDto> {
    return this.authService.login(username, password);
  }
}
