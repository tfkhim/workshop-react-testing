import { FC, useCallback, useMemo, useState } from 'react'

import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AppBar } from './AppBar'
import { TaskList } from './TaskList'
import { AddTaskDialog, NewTaskData, useAddTaskDialog } from './AddTaskDialog'
import { VisibilityToggleButton } from './VisibilityToggleButton'
import { NewTaskButton } from './NewTaskButton'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

export type Task = {
  id: string
  done: boolean
  description: string
  dueDate: Date | null
}

export const TaskListApp: FC = () => {
  const preferseDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const colorScheme = preferseDarkMode ? 'dark' : 'light'
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorScheme,
        },
        typography: {
          fontSize: 14,
        },
      }),
    [colorScheme]
  )

  const [tasks, setTasks] = useState<Task[]>([])
  const [showAllEntries, setShowAllEntries] = useState(false)

  const toggleVisibility = useCallback(
    () => setShowAllEntries((oldState) => !oldState),
    [setShowAllEntries]
  )

  const addTask = useCallback(
    (task: NewTaskData) =>
      setTasks((oldTasks) => [
        ...oldTasks,
        { id: crypto.randomUUID(), done: false, ...task },
      ]),
    [setTasks]
  )

  const { dialogProps, showDialog } = useAddTaskDialog({
    onAddNewTask: addTask,
  })

  const filteredTasks = useMemo(() => {
    return showAllEntries ? tasks : tasks.filter((task) => !task.done)
  }, [tasks, showAllEntries])

  const taskListProps = useMemo(
    () =>
      filteredTasks.map((task) => {
        return {
          ...task,
          onToggleDone: () =>
            setTasks((tasks) => toggleDoneForId(tasks, task.id)),
        }
      }),
    [filteredTasks, setTasks]
  )

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline enableColorScheme />
        <AppBar>
          <VisibilityToggleButton
            visible={showAllEntries}
            onToggle={toggleVisibility}
          />
          <NewTaskButton onClick={showDialog} />
        </AppBar>
        <Container>
          <TaskList tasks={taskListProps} />
        </Container>
        <AddTaskDialog {...dialogProps} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

function toggleDoneForId(tasks: Task[], id: string): Task[] {
  return tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        done: !task.done,
      }
    } else {
      return task
    }
  })
}
