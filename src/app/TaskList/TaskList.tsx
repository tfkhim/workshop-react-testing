import { FC } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'

type TaskListProps = {
  tasks: ({ id: string } & TaskListEntryProps)[]
}

export const TaskList: FC<TaskListProps> = ({ tasks }) => {
  return (
    <List>
      {tasks.map(({ id, ...entryProps }) => (
        <TaskListEntry key={id} {...entryProps} />
      ))}
    </List>
  )
}

type TaskListEntryProps = {
  done: boolean
  dueDate: Date | null
  description: string
}

const TaskListEntry: FC<TaskListEntryProps> = ({
  done,
  description,
  dueDate,
}) => {
  return (
    <ListItem divider>
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
