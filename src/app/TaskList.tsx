import { FC } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'

type TaskListProps = {
  tasks: TaskListEntryProps[]
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <List>
      {tasks.map((entryProps) => (
        <TaskListEntry key={entryProps.id} {...entryProps} />
      ))}
    </List>
  )
}

type TaskListEntryProps = {
  id: string
  done: boolean
  dueDate: Date | null
  description: string
  onToggleDone: () => void
}

const TaskListEntry: FC<TaskListEntryProps> = ({
  done,
  description,
  dueDate,
  onToggleDone,
}) => {
  return (
    <ListItem divider>
      <ListItemIcon aria-label="done">
        <Checkbox checked={done} onClick={onToggleDone} />
      </ListItemIcon>
      <ListItemButton disableRipple>
        <ListItemText
          primary={description}
          secondary={dueDate?.toDateString()}
        />
      </ListItemButton>
    </ListItem>
  )
}
