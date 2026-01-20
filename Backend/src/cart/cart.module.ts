/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { DatabaseModule } from 'src/database/database.module';
import { cartProviders } from './schema/cart.provider';
import { UsersModule } from 'src/users/users.module';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    forwardRef(() => FoodModule), // ✅ استخدم forwardRef
  ],
  controllers: [CartController],
  providers: [CartService, ...cartProviders],
  exports: [CartService, ...cartProviders],
})
export class CartModule {}
