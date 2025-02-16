import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TASK_STATUS } from './task.model'
import { ValueOf } from 'src/common/types/types'
import { IsNotEmpty } from 'class-validator'
import { User } from 'src/auth/user.entity'
import { Exclude } from 'class-transformer'

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

  @ManyToOne((_user) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User
}
