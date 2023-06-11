import { FC, useCallback, useMemo, useState } from 'react'

import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AppBar } from './AppBar/AppBar'
import { TaskList } from './TaskList/TaskList'
import {
  AddTaskDialog,
  NewTaskData,
  useAddTaskDialog,
} from './AddTask/AddTaskDialog'
import { VisibilityToggleButton } from './AppBar/VisibilityToggleButton'
import { NewTaskButton } from './AddTask/NewTaskButton'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const initialTasks = [
  {
    id: crypto.randomUUID(),
    done: true,
    description: 'first task',
    dueDate: new Date(),
  },
  {
    id: crypto.randomUUID(),
    done: false,
    description: 'second task',
    dueDate: null,
  },
  {
    id: crypto.randomUUID(),
    done: false,
    description: 'third task',
    dueDate: new Date(2022, 7, 3),
  },
]

export const TodoListApp: FC = () => {
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

  const [tasks, setTasks] = useState(initialTasks)
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
          <TaskList tasks={filteredTasks} />
        </Container>
        <AddTaskDialog {...dialogProps} />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
