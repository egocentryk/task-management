import { Test, TestingModule } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TasksRepository } from './tasks.repository'
import { TASK_STATUS } from './task.model'
import { find } from 'rxjs'

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
})

const mockUser = {
  username: 'Test user',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
}

const mockTask = {
  title: 'Test task',
  description: 'Test desc',
  id: 'someId',
  status: TASK_STATUS.OPEN,
}

describe('TasksService', () => {
  let tasksService: TasksService
  let tasksRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile()

    tasksService = module.get<TasksService>(TasksService)
    tasksRepository = module.get<TasksRepository>(TasksRepository)
  })

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue')

      const result = await tasksService.getTasks({}, mockUser)
      expect(result).toEqual('someValue')
    })
  })

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      tasksRepository.findOne.mockResolvedValue(mockTask)

      const result = await tasksService.getTaskById('someId', mockUser)
      expect(result).toEqual(mockTask)
    })

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null)

      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow()
    })
  })
})
