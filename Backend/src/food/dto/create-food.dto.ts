/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateFoodDto {
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'min length of name is 3' })
  @MaxLength(30, { message: 'max length of name is 30' })
  name: string;

  @IsNumber({}, { message: 'price must be a number' })
  @Min(0, { message: 'min price is 0' })
  @Max(1000, { message: 'max price is 1000' })
  price: number;

  @IsNumber({}, { message: 'price must be a number' })
  @IsOptional()
  discount?: number;

  @IsArray({ message: 'ingredients must be a string' })
  ingredients: string;

  @IsOptional()
  description?: string;

  @IsString()
  type: string;

  @IsOptional()
  mealTimes: any;

  @IsOptional()
  isFeatured?: boolean;

  @IsOptional()
  active?: boolean;

  @IsString({ message: 'image must be a string' })
  @IsUrl({}, { message: 'image must be a valid url' })
  image: string;
  
}
