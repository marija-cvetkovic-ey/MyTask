import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Task) private repo: Repository<Task>) { }

    async create(title: string, description: string) {

        const task = this.repo.create({ title, description });

        await this.repo.save(task);
        return task;
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    find() {
        return this.repo.find();
    }

    async update(id: number, attrs: Partial<Task>) {
        const task = await this.findOne(id);
        if (!task) {
            throw new NotFoundException('task not found');
        }
        Object.assign(task, attrs);
        return this.repo.save(task);
    }

    async remove(id: number) {
        const task = await this.findOne(id);
        if (!task) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(task);
    }
}
