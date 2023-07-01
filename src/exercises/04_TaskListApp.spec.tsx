/* eslint-disable @typescript-eslint/no-unused-vars */
import { RenderResult, render, screen, within } from '@testing-library/react'
import { expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { TaskListApp } from '../app/TaskListApp'
import { queries } from '../testUtils'
/* eslint-enable */

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
  expect.fail(
    'TODO: Add a method to the model for toggling the visibility and invoke it here'
  )

  expect(app.queryListItem('New Task')).toBeVisible()
})

class TaskListAppModel {
  public static setup(): TaskListAppModel {
    return new TaskListAppModel()
  }

  private readonly view: RenderResult<typeof queries>
  private readonly user: ReturnType<typeof userEvent.setup>

  private constructor() {
    expect.fail(
      'TODO: Render the whole application and assign the result to the view property. ' +
        'You also need to pass the imported custom queries in the render options: render(..., {queries}).'
    )
    expect.fail(
      'TODO: Setup an UserEvent instance and assign it to the user property.'
    )
  }

  public getAddNewTaskButton(): HTMLElement {
    expect.fail('TODO: Get and return the add new task button')
  }

  public getToggleVisibilityButton(): HTMLElement {
    return this.view.getByLabelText('toggle visibility')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async addTask(description: string, dueDate?: string): Promise<void> {
    expect.fail('TODO: Open the dialog by clicking on the button')
    expect.fail('TODO: Fill the description input with the input value')
    if (dueDate !== undefined) {
      await this.user.type(screen.getByLabelText('Due Date'), dueDate)
    }
    expect.fail('TODO: Click the "Add" button')
  }

  public async completeTask(text: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const task = await this.waitForListItem(text)
    expect.fail('TODO: Get the checkbox within the task element and click it')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async waitForListItem(text: string): Promise<HTMLElement> {
    expect.fail(
      'TODO: Wait until the list item containing the given text appears and return it. ' +
        'The custom queries in testUtils.ts will help you with that task. Because we pass ' +
        'them to the render function they are available as members of the view property.'
    )
  }

  public queryListItem(text: string): HTMLElement | null {
    return this.view.queryListItemByChildText(text)
  }
}
