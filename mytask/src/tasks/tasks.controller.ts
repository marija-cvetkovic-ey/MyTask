import { Controller, Post, Get, Body, Param, NotFoundException, Delete, Patch } from '@nestjs/common';

import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) { }

    @Post()
    async createTask(@Body() body: CreateTaskDto) {
        const task = await this.tasksService.create(body.title, body.description);

        return task;
    }

    @Get('/:id')
    async findTask(@Param('id') id: string) {
        const task = await this.tasksService.findOne(parseInt(id));
        if (!task) {
            throw new NotFoundException('task not found');
        }
        return task;
    }

    @Get()
    async findAll() {
        const tasks = await this.tasksService.find();
        if (!tasks) {
            throw new NotFoundException('tasks not found');

        }
        return tasks;
    }

    @Delete('/:id')
    removeTask(@Param('id') id: string) {
        return this.tasksService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
        return this.tasksService.update(parseInt(id), body);
    }
}
