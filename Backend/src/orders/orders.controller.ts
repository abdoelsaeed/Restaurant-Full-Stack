/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/guard/Auth.guard';
import { Roles } from 'src/guard/user.decorator';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Post()
  createCheckoutSession(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: any,
  ) {
    return this.ordersService.createCheckoutSession(
      createOrderDto,
      req.user?._id,
    );
  }

  @UseGuards(AuthGuard)
  @Roles(['User', 'Admin'])
  @Get('my-orders')
  findMyOrders(@Req() req: any) {
    return this.ordersService.findMyOrders(req.user?._id);
  }

  @UseGuards(AuthGuard)
  @Roles(['Admin'])
  @Get('all')
  findAllOrders(
    @Query('status') status?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.ordersService.findAllOrdersWithFilter({
      status: status as any,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });
  }

  @UseGuards(AuthGuard)
  @Roles(['User', 'Admin'])
  @Get('statistics')
  getMyStatistics(@Req() req: any) {
    return this.ordersService.getMyStatistics(req.user?._id);
  }
}
