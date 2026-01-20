/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeWebhookController } from './stripe.webhook.controller';
import { OrdersModule } from 'src/orders/orders.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, forwardRef(() => OrdersModule), ConfigModule], // ⭐ مهم
  providers: [StripeService],
  controllers: [StripeWebhookController],
  exports: [StripeService],
})
export class StripeModule {}
