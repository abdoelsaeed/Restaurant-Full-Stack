/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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

  @IsEnum(['User', 'Admin'], { message: 'role must be a Admin or User' })
  @IsOptional()

  role: string;

  @IsUrl({}, { message: 'avatar must be a Url' })
  @IsOptional()

  avatar: string;

  @IsBoolean({ message: 'active must be a true or false' })
  @IsEnum([true, false], { message: 'active must be a true or false' })
  @IsOptional()
  active: boolean;

  @IsString({ message: 'verification_Code must be a string' })
  @IsOptional()
  @Length(6, 6, { message: 'verification_Code must be 6 characters' })

  verification_Code?: string;

  @IsString({ message: 'gender must be a string' })
  @IsEnum(['female', 'male'], { message: 'gender must be a true or false' })
  @IsOptional()

  gender: string;

  @IsOptional()
  provider: string;

  @IsOptional()
  providerId: string;
}
