import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { GetUser } from '../../auth/get-user.decorator';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

import { Member3StatisticsService } from './member3-statistics.service';


@Controller('member3/statistics')
@UseGuards(JwtAuthGuard)
export class Member3StatisticsController {


  constructor(
    private readonly service: Member3StatisticsService,
  ) {}





  // Thống kê tổng quan task của user

  @Get('summary')
  summary(

    @GetUser() user:any,

  ) {

    return this.service.summary(

      user.id,

    );

  }


}