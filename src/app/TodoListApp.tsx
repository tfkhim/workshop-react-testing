import { FC, useMemo, useState } from 'react'

import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import useMediaQuery from '@mui/material/useMediaQuery'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { AppBar } from './AppBar/AppBar'
import { TaskList } from './TaskList/TaskList'
import { AddTaskDialog } from './AddTaskDialog'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const initialTasks = [
  { key: 1, done: true, description: 'first task', dueDate: new Date() },
  {
    key: 2,
    done: false,
    description: 'second task',
    dueDate: null,
  },
  {
    key: 3,
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
  const [showDialog, setShowDialog] = useState(true)

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline enableColorScheme />
        <AppBar />
        <Container>
          <TaskList tasks={tasks} />
        </Container>
        <AddTaskDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          onAddNew={(task) => {
            setTasks((oldTasks) => [
              ...oldTasks,
              { key: oldTasks.length, done: false, ...task },
            ])
            setShowDialog(false)
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
