/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import { Request } from 'express';
import { Roles } from 'src/guard/user.decorator';
import { AuthGuard } from 'src/guard/Auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Post()
  addToCart(@Body() addToCartDto: AddToCartDto, @Req() req: Request) {
    return this.cartService.addToCart(addToCartDto, req.user?._id as string);
  }

  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Get()
  getMyCart(@Req() req: Request) {
    return this.cartService.getMyCart(req.user?._id);
  }

  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Get('count')
  countMyCart(@Req() req: Request) {
    return this.cartService.countMyCart(req.user?._id);
  }

  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Patch('item/:itemId')
  updateCartQuantity(
    @Param('itemId') itemId: string,
    @Body() { quantity }: { quantity: number },
    @Req() req: Request,
  ) {
    return this.cartService.updateCartQuantity(req.user?._id, itemId, quantity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
