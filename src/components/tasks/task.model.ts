import { ValueOf } from 'src/common/types/types'

export const TASK_STATUS = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const

export interface Task {
  id: string
  title: string
  description: string
  status: ValueOf<typeof TASK_STATUS>
}
