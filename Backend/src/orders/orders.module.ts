/* eslint-disable prettier/prettier */
import { DatabaseModule } from './../database/database.module';
import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { StripeModule } from 'src/stripe/stripe.module';
import { orderProviders } from './schema/order.provider';
import { CartModule } from 'src/cart/cart.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => StripeModule),
    forwardRef(() => CartModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, ...orderProviders],
  exports: [OrdersService, ...orderProviders],
})
export class OrdersModule {}
