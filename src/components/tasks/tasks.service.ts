import { Injectable } from '@nestjs/common'
import { Task, TASK_STATUS } from './task.model'
import { v7 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto'
import { ValueOf } from 'src/common/types/types'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { stat } from 'fs'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto

    let tasks = this.getAllTasks()

    if (status) {
      tasks = tasks.filter((task) => task.status === status)
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      )
    }

    return tasks
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

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id)
  }

  updateTaskStatus(id: string, status: ValueOf<typeof TASK_STATUS>): Task {
    const task = this.getTaskById(id)
    task.status = status
    return task
  }
}
