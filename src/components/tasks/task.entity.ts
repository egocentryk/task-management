import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TASK_STATUS } from './task.model'
import { ValueOf } from 'src/common/types/types'
import { IsNotEmpty } from 'class-validator'

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsNotEmpty()
  title: string

  @Column()
  description: string

  @Column({
    default: TASK_STATUS.OPEN,
    type: 'enum',
    enum: TASK_STATUS,
  })
  status: ValueOf<typeof TASK_STATUS>
}
