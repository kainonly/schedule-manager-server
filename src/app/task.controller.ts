import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ValidatePipe } from '../common/validate.pipe';
import { TaskService } from '../database/task.service';
import { TaskValidate } from './task.validate';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
  ) {
  }

  @Post('get')
  @UsePipes(new ValidatePipe(TaskValidate.get))
  async get(@Body() body: any): Promise<any> {
    const data = await this.taskService.repository.find({
      id: body.id,
    });
    return {
      error: 0,
      data,
    };
  }

  @Post('lists')
  async lists(): Promise<any> {
    const data = await this.taskService.repository.find();
    return {
      error: 0,
      data,
    };
  }

  @Post('add')
  @UsePipes(new ValidatePipe(TaskValidate.add))
  async add(@Body() body: any): Promise<any> {
    const result = await this.taskService.repository.insert({
      job_name: body.job_name,
      rule: body.rule,
      time_zone: body.time_zone,
      create_time: new Date(),
      update_time: new Date(),
    });
    return result ? {
      error: 0,
      msg: 'ok',
    } : {
      error: 1,
      msg: 'failed',
    };
  }

  @Post('update')
  @UsePipes(new ValidatePipe(TaskValidate.update))
  async update(@Body() body: any): Promise<any> {
    const result = await this.taskService.repository.update({
      id: body.id,
    }, body);
    return result ? {
      error: 0,
      msg: 'ok',
    } : {
      error: 1,
      msg: 'failed',
    };
  }

  @Post('delete')
  @UsePipes(new ValidatePipe(TaskValidate.delete))
  async delete(@Body() body: any): Promise<any> {
    const result = await this.taskService.repository.delete({
      id: body.id,
    });
    return result ? {
      error: 0,
      msg: 'ok',
    } : {
      error: 1,
      msg: 'failed',
    };
  }
}