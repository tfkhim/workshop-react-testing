import { render, screen } from '@testing-library/react'
import { Mock, expect, it, vi } from 'vitest'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import userEvent from '@testing-library/user-event'
import { AddTaskDialog, NewTaskData } from '../../app/AddTaskDialog'

it('should display the dialog if opened', () => {
  givenOpenedDialog()

  expect(screen.getByText('Add New Task')).toBeVisible()
})

it('should not display the dialog if not opened', () => {
  givenClosedDialog()

  expect(screen.queryByText('Add New Task')).not.toBeInTheDocument()
})

it('should close the dialog if the user presses the cancel button', async () => {
  const { onClose } = givenOpenedDialog()

  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  expect(onClose).toHaveBeenCalledOnce()
})

it('should close the dialog if the user presses escape', async () => {
  const { onClose } = givenOpenedDialog()

  const user = userEvent.setup()
  await user.keyboard('{Escape}')

  expect(onClose).toHaveBeenCalledOnce()
})

it('should add a new task when the users presses add', async () => {
  const { onAdd } = givenOpenedDialog()

  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: 'Add' }))

  expect(onAdd).toHaveBeenCalledWith({ dueDate: null, description: '' })
})

it('should pass the description to the add task callback', async () => {
  const { onAdd } = givenOpenedDialog()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Description'), 'my description')
  await user.click(screen.getByRole('button', { name: 'Add' }))

  expect(onAdd).toHaveBeenCalledWith({
    dueDate: null,
    description: 'my description',
  })
})

it('should pass the due date to the add task callback', async () => {
  const { onAdd } = givenOpenedDialog()

  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Due Date'), '11022021')
  await user.click(screen.getByRole('button', { name: 'Add' }))

  expect(onAdd).toHaveBeenCalledWith({
    dueDate: new Date(2021, 10, 2),
    description: '',
  })
})

type ComponentCallbacks = {
  onClose: Mock<[], void>
  onAdd: Mock<[NewTaskData], void>
}

function givenOpenedDialog(): ComponentCallbacks {
  return renderDialog(true)
}

function givenClosedDialog(): ComponentCallbacks {
  return renderDialog(false)
}

function renderDialog(open: boolean): ComponentCallbacks {
  const onClose = vi.fn<[], void>()
  const onAdd = vi.fn<[NewTaskData], void>()
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AddTaskDialog open={open} onClose={onClose} onAdd={onAdd} />
    </LocalizationProvider>
  )

  return { onClose, onAdd }
}
