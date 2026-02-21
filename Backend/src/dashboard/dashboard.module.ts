/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersModule } from 'src/orders/orders.module';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => OrdersModule), forwardRef(() => FoodModule)],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
