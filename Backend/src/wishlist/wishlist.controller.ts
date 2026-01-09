/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,

  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Roles } from 'src/guard/user.decorator';
import { AuthGuard } from 'src/guard/Auth.guard';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Post(':foodId')
  toggleWishlist(@Param('foodId') foodId: string, @Req() req: any) {
    return this.wishlistService.toggle(req, foodId);
  }

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
