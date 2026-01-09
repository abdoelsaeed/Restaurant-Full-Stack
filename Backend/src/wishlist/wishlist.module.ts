/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { UsersModule } from 'src/users/users.module';
import { FoodModule } from 'src/food/food.module';
import { DatabaseModule } from 'src/database/database.module';
import { wishlistsProviders } from './schema/wishlist.provider';

@Module({
  imports: [DatabaseModule, UsersModule, forwardRef(() => FoodModule)],
  controllers: [WishlistController],
  providers: [WishlistService, ...wishlistsProviders],
  exports: [WishlistService, ...wishlistsProviders],
})
export class WishlistModule {}
