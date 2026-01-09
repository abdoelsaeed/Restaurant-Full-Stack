/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cartProviders } from './schema/cart.provider';
import { UsersModule } from 'src/users/users.module';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [DatabaseModule, UsersModule, FoodModule],
  controllers: [CartController],
  providers: [CartService, ...cartProviders],
})
export class CartModule {}
