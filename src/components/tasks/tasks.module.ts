import { Module } from '@nestjs/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from './task.entity'
import { TasksRepository } from './task.repository'

@Module({
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TasksRepository],
})
export class TasksModule {}
