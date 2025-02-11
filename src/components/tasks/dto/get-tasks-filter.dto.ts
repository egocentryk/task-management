import { ValueOf } from 'src/common/types/types'
import { TASK_STATUS } from '../task.model'

export class GetTasksFilterDto {
  status?: ValueOf<typeof TASK_STATUS>
  search?: string
}
