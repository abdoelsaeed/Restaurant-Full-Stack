/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/guard/Auth.guard';
import { Roles } from 'src/guard/user.decorator';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
  @UseGuards(AuthGuard)
  @Roles(['Admin'])
  @Get('statistics-page')
  async getStatisticsPage(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('groupBy') groupBy?: 'daily' | 'weekly' | 'monthly',
  ) {
    const fromDate = from ? new Date(from) : undefined;

    const toDate = to
      ? new Date(new Date(to).setHours(23, 59, 59, 999))
      : undefined;

    return this.dashboardService.DashboardStatisticsPage({
      from: fromDate,
      to: toDate,
      groupBy,
    });
  }


}
