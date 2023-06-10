import { FC } from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import LogoIcon from '@mui/icons-material/TaskAltOutlined'
import styled from '@mui/material/styles/styled'
import { VisibilityToggleButton } from './VisibilityToggleButton'
import { NewTaskButton } from './NewTaskButton'

export const AppBar: FC = () => {
  return (
    <MuiAppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Logo />
          <ApplicationName />
          <StyledVisibilityToggleButton />
          <StyledNewTaskButton />
        </Toolbar>
      </Container>
    </MuiAppBar>
  )
}

const Logo = styled(LogoIcon)(
  ({ theme }) => `
    font-size: ${theme.typography.h4.fontSize};
    margin-right: ${theme.spacing(2)};`
)

const ApplicationName: FC = () => {
  return (
    <Typography component="span" variant="h4" sx={{ flexGrow: 1 }}>
      Tasks
    </Typography>
  )
}

const StyledVisibilityToggleButton = styled(VisibilityToggleButton)(
  ({ theme }) => `
margin: ${theme.spacing(1)} 0;
`
)

const StyledNewTaskButton = styled(NewTaskButton)(
  ({ theme }) => `
margin: ${theme.spacing(1)} 0;
`
)
