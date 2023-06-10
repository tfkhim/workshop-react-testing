import { FC, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import { DatePicker } from '@mui/x-date-pickers/DatePicker/DatePicker'

type AddTaskDialogProps = {
  open: boolean
  onClose: () => void
  onAddNew: (_: { dueDate: Date | null; description: string }) => void
}

export const AddTaskDialog: FC<AddTaskDialogProps> = ({
  open,
  onClose,
  onAddNew,
}) => {
  const [dueDate, setDueDate] = useState<Date | null>(null)
  const [description, setDescription] = useState('')

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent dividers>
        <InputLabel htmlFor="description">Description</InputLabel>
        <TextField
          id="description"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          autoFocus
        />
        <InputLabel htmlFor="due-date">Due Date</InputLabel>
        <DatePicker
          slotProps={{ textField: { id: 'due-date' } }}
          value={dueDate}
          defaultValue={new Date()}
          onChange={(event) => setDueDate(event)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onAddNew({ dueDate, description })}>Add</Button>
      </DialogActions>
    </Dialog>
  )
}
