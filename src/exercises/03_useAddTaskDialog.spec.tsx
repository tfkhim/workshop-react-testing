/* eslint-disable @typescript-eslint/no-unused-vars */
import { RenderHookResult, act, renderHook } from '@testing-library/react'
import { Mock, expect, it, vi } from 'vitest'
import {
  NewTaskData,
  UseAddTaskDialogProps,
  useAddTaskDialog,
} from '../app/AddTaskDialog'
/* eslint-enable */

it('should not initially show the dialog', () => {
  const { dialogProps } = givenRenderedUseAddTaskDialogHook()

  expect(dialogProps.open).toStrictEqual(false)
})

it('should show the dialog when asked to', () => {
  givenRenderedUseAddTaskDialogHook()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dialogProps } = whenShowDialog()

  expect.fail('TODO: Add an expect(...) call to make sure the dialog is opened')
})

it('should close the dialog when asked to', () => {
  givenOpenedDialog()

  const { dialogProps } = whenCloseDialog()

  expect(dialogProps.open).toStrictEqual(false)
})

it('should close the dialog after adding a task', () => {
  givenOpenedDialog()

  const { dialogProps } = whenAddTask(taskData)

  expect(dialogProps.open).toStrictEqual(false)
})

it('should notify about added task', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onAddNewTask } = givenOpenedDialog()

  whenAddTask(taskData)

  expect.fail(
    'TODO: Add an expect(...) call to make sure the onAddNewTask was called with the correct data'
  )
})

const taskData = {
  dueDate: new Date(2021, 2, 1),
  description: 'My new task',
}

let renderHookResult: RenderHookResult<
  ReturnType<typeof useAddTaskDialog>,
  UseAddTaskDialogProps
>

type RenderResult = {
  onAddNewTask: Mock<[NewTaskData], void>
} & ReturnType<typeof useAddTaskDialog>

function givenRenderedUseAddTaskDialogHook(): RenderResult {
  const onAddNewTask = vi.fn()

  expect.fail(
    'TODO: Render the useAddTaskDialog hook and pass the onAddNewTask callback as initial props'
  )
  /*
  renderHookResult = renderHook(...)
  */

  return { onAddNewTask, ...renderHookResult.result.current }
}

function givenOpenedDialog(): RenderResult {
  const { onAddNewTask } = givenRenderedUseAddTaskDialogHook()
  const currentResult = whenShowDialog()
  return { onAddNewTask, ...currentResult }
}

function whenShowDialog(): ReturnType<typeof useAddTaskDialog> {
  act(renderHookResult.result.current.showDialog)

  return renderHookResult.result.current
}

function whenCloseDialog(): ReturnType<typeof useAddTaskDialog> {
  expect.fail('TODO: Call the onClose callback')

  return renderHookResult.result.current
}

function whenAddTask(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  taskData: NewTaskData
): ReturnType<typeof useAddTaskDialog> {
  expect.fail('TODO: Call the onAdd callback and pass the taskData')

  return renderHookResult.result.current
}
