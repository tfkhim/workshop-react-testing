import { RenderResult, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { TaskListApp } from '../app/TaskListApp'
import { queries } from '../testUtils'

it('should display a logo', () => {
  TaskListAppModel.setup()

  expect(screen.getByLabelText('logo')).toBeVisible()
})

it('should display the application name', () => {
  TaskListAppModel.setup()

  expect(screen.getByRole('heading')).toHaveTextContent('Tasks')
})

it('should display a toggle visibility button', () => {
  const app = TaskListAppModel.setup()

  expect(app.getToggleVisibilityButton()).toBeVisible()
})

it('should display an add task button', () => {
  const app = TaskListAppModel.setup()

  expect(app.getAddNewTaskButton()).toBeVisible()
})

it('should be possible to add new tasks', async () => {
  const app = TaskListAppModel.setup()

  await app.addTask('New Task', '11022022')

  expect(await app.waitForListItem('New Task')).toBeVisible()
})

it('should be possible to complete a task', async () => {
  const app = TaskListAppModel.setup()

  await app.addTask('New Task', '11022022')
  await app.completeTask('New Task')

  expect(app.queryListItem('New Task')).not.toBeInTheDocument()
})

it('should be possible to toggle visibility of a task', async () => {
  const app = TaskListAppModel.setup()

  await app.addTask('New Task', '11022022')
  await app.completeTask('New Task')
  await app.toggleVisibility()

  expect(app.queryListItem('New Task')).toBeVisible()
})

class TaskListAppModel {
  public static setup(): TaskListAppModel {
    return new TaskListAppModel()
  }

  private readonly view: RenderResult<typeof queries>
  private readonly user: ReturnType<typeof userEvent.setup>

  private constructor() {
    this.view = render(<TaskListApp />, {
      queries,
    })
    this.user = userEvent.setup()
  }

  public getAddNewTaskButton(): HTMLElement {
    return this.view.getByLabelText('add new task')
  }

  public getToggleVisibilityButton(): HTMLElement {
    return this.view.getByLabelText('toggle visibility')
  }

  public async openAddTaskDialog(): Promise<void> {
    await this.user.click(this.getAddNewTaskButton())
  }

  public async addTask(description: string, dueDate?: string): Promise<void> {
    await this.openAddTaskDialog()
    await this.user.type(screen.getByLabelText('Description'), description)
    if (dueDate !== undefined) {
      await this.user.type(screen.getByLabelText('Due Date'), dueDate)
    }
    await this.user.click(screen.getByRole('button', { name: 'Add' }))
  }

  public async completeTask(text: string): Promise<void> {
    const task = await this.view.findListItemByChildText(text)
    const checkbox = within(task).getByRole('checkbox')
    await this.user.click(checkbox)
  }

  public async toggleVisibility(): Promise<void> {
    await this.user.click(this.getToggleVisibilityButton())
  }

  public queryListItem(text: string): HTMLElement | null {
    return this.view.queryListItemByChildText(text)
  }

  public async waitForListItem(text: string): Promise<HTMLElement> {
    return await this.view.findListItemByChildText(text)
  }
}
