/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen } from '@testing-library/react'
import { Mock, expect, it, vi } from 'vitest'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import userEvent from '@testing-library/user-event'
import { AddTaskDialog, NewTaskData } from '../app/AddTaskDialog'
/* eslint-enable */

it('should display the dialog if opened', () => {
  givenOpenedDialog()

  expect.fail(
    'TODO: Add an expect(...) call to make sure the dialog title is visible'
  )
})

it('should not display the dialog if not opened', () => {
  givenClosedDialog()

  expect.fail(
    'TODO: Add an expect(...) call to make sure the dialog title is not part of the document'
  )
})

it('should close the dialog if the user presses the cancel button', async () => {
  const { onClose } = givenOpenedDialog()

  expect.fail('TODO: Click the "Cancel" button')

  expect(onClose).toHaveBeenCalledOnce()
})

it('should close the dialog if the user presses escape', async () => {
  const { onClose } = givenOpenedDialog()

  expect.fail('TODO: Press the escape button (e.g. "{Escape}")')

  expect(onClose).toHaveBeenCalledOnce()
})

it('should add a new task when the users presses add', async () => {
  const { onAdd } = givenOpenedDialog()

  expect.fail('TODO: Press the "Add" button')

  expect(onAdd).toHaveBeenCalledWith({ dueDate: null, description: '' })
})

it('should pass the description to the add task callback', async () => {
  const { onAdd } = givenOpenedDialog()

  expect.fail(
    'TODO: Type the text "my description" into the description field and then press the "Add" button'
  )

  expect(onAdd).toHaveBeenCalledWith({
    dueDate: null,
    description: 'my description',
  })
})

it('should pass the due date to the add task callback', async () => {
  const { onAdd } = givenOpenedDialog()

  expect.fail(
    'TODO: Type the text "11022021" into the due date field and then press the "Add" button'
  )

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function renderDialog(open: boolean): ComponentCallbacks {
  const onClose = vi.fn<[], void>()
  const onAdd = vi.fn<[NewTaskData], void>()

  expect.fail(
    'TODO: Render the dialog and pass in the open flag and the mock callbacks'
  )
  /*
  render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      ...
    </LocalizationProvider>
  )
  */

  return { onClose, onAdd }
}
