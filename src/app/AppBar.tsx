import { FC, PropsWithChildren } from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import LogoIcon from '@mui/icons-material/TaskAltOutlined'
import styled from '@mui/material/styles/styled'

export const AppBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiAppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Logo aria-label="logo" />
          <ApplicationName />
          <ActionsContainer>{children}</ActionsContainer>
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
    <Typography variant="h4" sx={{ flexGrow: 1 }}>
      Tasks
    </Typography>
  )
}

const ActionsContainer = styled('span')(
  ({ theme }) => `
display: inline-flex;
margin: ${theme.spacing(1)} 0;
column-gap: ${theme.spacing(1)};
`
)
