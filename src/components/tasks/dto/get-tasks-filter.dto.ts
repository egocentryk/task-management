import { ValueOf } from 'src/common/types/types'
import { TASK_STATUS } from '../task.model'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TASK_STATUS)
  status?: ValueOf<typeof TASK_STATUS>

  @IsOptional()
  @IsString()
  search?: string
}
