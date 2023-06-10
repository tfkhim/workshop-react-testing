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
      {tasks.map(({ key, ...other }) => (
        <TaskListEntry key={key} {...other} />
      ))}
    </List>
  )
}

type TaskListEntryProps = {
  key: number
  done: boolean
  dueDate: Date | null
  description: string
}

const TaskListEntry: FC<TaskListEntryProps> = ({
  key,
  done,
  description,
  dueDate,
}) => {
  return (
    <ListItem key={key} divider>
      <ListItemIcon aria-label="done">
        <Checkbox checked={done} />
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
