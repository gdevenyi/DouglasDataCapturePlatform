import { ApiProperty } from '@nestjs/swagger';

import { LoginCredentials } from '@ddcp/types';
import { IsString } from 'class-validator';

export class LoginRequestDto implements LoginCredentials {
  @ApiProperty({ example: 'admin' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}
