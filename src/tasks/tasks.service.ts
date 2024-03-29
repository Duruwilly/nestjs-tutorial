import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// since it's a service, it will own the business logic

@Injectable() // this makes it a singleton that can be shared across the application
export class TasksService {
  public tasks: Task[] = [];
  task: Task;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      // throw new NotFoundException(); this will just throw 404 with a not found message
      throw new NotFoundException(`${id} cannot be found`); // to customize the message
    }

    return found;
  }

  //   without dto
  //   createTask(title: string, description: string): Task {
  //     const taska: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };

  //     this.tasks.push(taska);
  //     return taska;
  //   }

  //   with dto
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const taska: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(taska);
    return taska;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
    // return this.tasks;
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
