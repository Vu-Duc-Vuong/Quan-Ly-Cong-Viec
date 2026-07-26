import { Controller, Get } from '@nestjs/common';

@Controller('api/statistics')
export class StatisticsController {
  @Get('summary')
  getSummary() {
    return {
      success: true,
      data: {
        totalTasks: 3,
        dueTodayTasks: 1,
        overdueTasks: 0,
        completedTasks: 0,
      },
    };
  }
}