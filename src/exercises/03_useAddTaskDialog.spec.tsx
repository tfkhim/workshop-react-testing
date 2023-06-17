import { RenderHookResult, act, renderHook } from '@testing-library/react'
import { Mock, expect, it, vi } from 'vitest'
import {
  NewTaskData,
  UseAddTaskDialogProps,
  useAddTaskDialog,
} from '../app/AddTaskDialog'

it('should not initially show the dialog', () => {
  const { dialogProps } = givenRenderedUseAddTaskDialogHook()

  expect(dialogProps.open).toStrictEqual(false)
})

it('should show the dialog when asked to', () => {
  givenRenderedUseAddTaskDialogHook()

  const { dialogProps } = whenShowDialog()

  expect(dialogProps.open).toStrictEqual(true)
})

it('should close the dialog when asked to', () => {
  givenOpenedDialog()

  const { dialogProps } = whenCloseDialog()

  expect(dialogProps.open).toStrictEqual(false)
})

it('should notify about added task', () => {
  const { onAddNewTask } = givenOpenedDialog()

  whenAddTask(taskData)

  expect(onAddNewTask).toHaveBeenCalledWith(taskData)
})

it('should close the dialog after adding a task', () => {
  givenOpenedDialog()

  const { dialogProps } = whenAddTask({
    dueDate: new Date(2021, 2, 1),
    description: 'My new task',
  })

  expect(dialogProps.open).toStrictEqual(false)
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

  renderHookResult = renderHook(useAddTaskDialog, {
    initialProps: { onAddNewTask },
  })

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
  act(renderHookResult.result.current.dialogProps.onClose)

  return renderHookResult.result.current
}

function whenAddTask(
  taskData: NewTaskData
): ReturnType<typeof useAddTaskDialog> {
  act(() => renderHookResult.result.current.dialogProps.onAdd(taskData))

  return renderHookResult.result.current
}
