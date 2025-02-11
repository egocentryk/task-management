import { Module } from '@nestjs/common'
import { TasksModule } from './components/tasks/tasks.module'

@Module({
  imports: [TasksModule],
})
export class AppModule {}
