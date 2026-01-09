/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

/* eslint-disable prettier/prettier */
export class AddToCartDto {
  @IsString({ message: 'foodId must be a string' })
  foodId: string;
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;
}
