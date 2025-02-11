import { Injectable } from '@nestjs/common'
import { Task, TASK_STATUS } from './task.model'
import { v7 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id)
    if (!task) {
      throw new Error(`Task with ID ${id} not found`)
    }
    return task
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TASK_STATUS.OPEN,
    }

    this.tasks.push(task)

    return task
  }
}
