/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name?: string;

  password?: string;

  email?: string;

  age?: number;

  phone_number?: string;

  address?: string;

  role?: string;

  avatar?: string;

  active?: boolean;

  verification_Code?: string;

  gender?: string;
}
