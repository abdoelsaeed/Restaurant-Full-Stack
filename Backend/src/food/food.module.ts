/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { DatabaseModule } from 'src/database/database.module';
import { foodProviders } from './schema/food.provider';
import { WishlistModule } from 'src/wishlist/wishlist.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => WishlistModule),
    forwardRef(() => CartModule),
  ],
  controllers: [FoodController],
  providers: [FoodService, ...foodProviders],
  exports: [FoodService, ...foodProviders],
})
export class FoodModule {}
