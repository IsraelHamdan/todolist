/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServive: TasksService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskServive.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Task> {
    return this.taskServive.findOne(id);
  }

  @Post()
  async create(@Body() task: Task): Promise<Task> {
    return this.create(task);
  }

  @Put(':id')
  async upadate(
    @Param() id: number,
    @Body() task: Partial<Task>,
  ): Promise<Task> {
    return this.taskServive.update(id, task);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.taskServive.remove(id);
  }
}
