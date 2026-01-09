/* eslint-disable prettier/prettier */
import { IsString, MinLength, IsEmail } from 'class-validator';

export class ForgetPasswordDto {

  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  @MinLength(0, { message: 'email is required' })
  email: string;
}
