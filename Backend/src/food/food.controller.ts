/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto } from './dto/create-food.dto';
import { Roles } from 'src/guard/user.decorator';
import { FindFoodsQueryDto } from './dto/find-foods.query.dto';
import { OptionalAuthGuard } from 'src/guard/OptionalAuthGuard.guard';
import { AuthGuard } from 'src/guard/Auth.guard';
import { UpdateFoodDto } from './dto/update-food.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }

  @Roles(['User', 'Admin'])
  @UseGuards(OptionalAuthGuard)
  @Post()
  createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.foodService.createFood(createFoodDto);
  }

  @Get('home')
  getHome() {
    return this.foodService.getHomeData();
  }

  @UseGuards(OptionalAuthGuard)
  @Get('/menu')
  findAllFoods(@Query() query: FindFoodsQueryDto, @Req() req: any) {
    const userId = req.user?._id;
    return this.foodService.findAllFoods(query, userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodService.findOne(id);
  }

  @HttpCode(204)
  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(id);
  }

  @HttpCode(200)
  @Roles(['User', 'Admin'])
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodDto) {
    return this.foodService.update(id, updateFoodDto)
  }
}
