import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TASK_STATUS } from './task.model'
import { ValueOf } from 'src/common/types/types'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: ValueOf<typeof TASK_STATUS>
}
