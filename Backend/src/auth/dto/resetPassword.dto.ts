/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  @MinLength(0, { message: 'email is required' })
  email: string;

  @IsString()
  @IsNotEmpty()
  verification_Code: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(3, { message: 'min length of password is 3' })
  @MaxLength(30, { message: 'max length of password is 30' })
  newPassword: string;
}
