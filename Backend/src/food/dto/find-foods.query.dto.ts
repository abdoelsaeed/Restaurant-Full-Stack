/* eslint-disable prettier/prettier */
import { IsOptional, IsIn, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindFoodsQueryDto {
  @IsOptional()
  @IsIn(['burger', 'pizza', 'salad', 'dessert', 'beef', 'chicken', 'meal'])
  type?: string;

  @IsOptional()
  @IsIn(['breakfast', 'lunch', 'dinner'])
  mealTime?: string;

  // 🔽 Sorting Field
  @IsOptional()
  @IsIn(['price', 'finalPrice', 'ordersCount', 'createdAt'])
  sortBy?: string = 'createdAt';

  // 🔼 Sorting Order
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  q: string;

  @IsOptional()
  active?: string | boolean;
  
  @IsOptional()
  isFeatured?: string | boolean;
}
