import { ValueOf } from '@common/types/types'
import { TASK_STATUS } from '../task.model'
import { IsEnum } from 'class-validator'

export class UpdateTaskStatusDto {
  @IsEnum(TASK_STATUS)
  status: ValueOf<typeof TASK_STATUS>
}
