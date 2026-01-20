/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  status?: string;

  @IsOptional()
  currency?: string;
}
