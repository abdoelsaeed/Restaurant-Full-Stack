/* eslint-disable prettier/prettier */
import { IsString, MinLength, MaxLength, IsEmail, IsUrl, IsOptional, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateAuthDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'min length of name is 3' })
  @MaxLength(30, { message: 'max length of name is 30' })
  name: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(3, { message: 'min length of password is 3' })
  @MaxLength(30, { message: 'max length of password is 30' })
  password: string;

  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  @MinLength(0, { message: 'email is required' })
  email: string;

  @IsNumber({}, { message: 'age must be a number' })
  @IsOptional()
  age?: number;

  @IsString({ message: 'phone_number must be a string' })
  @IsPhoneNumber('EG', { message: 'phone_number must be a valid phone number' })
  @IsOptional()
  phone_number?: string;

  @IsString({ message: 'adress must be a string' })
  @IsOptional()
  address?: string;
  @IsUrl({}, { message: 'avatar must be a Url' })
  @IsOptional()
  avatar: string;
}

export class SignInDto {
  @IsString({ message: 'password must be a string' })
  @MinLength(3, { message: 'min length of password is 3' })
  @MaxLength(30, { message: 'max length of password is 30' })
  password: string;

  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email must be a valid email' })
  @MinLength(0, { message: 'email is required' })
  email: string;
}