/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskDTO } from './TasksDTO.interface';
import { CustomRequest } from '../interfaces/Request.interface';

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
  async create(
    @Body() taskDTO: TaskDTO,
    @Req() req: CustomRequest,
  ): Promise<Task> {
    const user = req.user.id;
    return this.taskServive.create(taskDTO, user);
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
