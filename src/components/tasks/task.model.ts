export const TASK_STATUS = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const

export type ValueOf<T> = T[keyof T]

export interface Task {
  id: string
  title: string
  description: string
  status: ValueOf<typeof TASK_STATUS>
}
