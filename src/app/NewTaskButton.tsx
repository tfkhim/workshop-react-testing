import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import NewTaskIcon from '@mui/icons-material/PlaylistAddOutlined'

export type NewTaskButtonProps = {
  onClick: () => void
}

export const NewTaskButton: FC<NewTaskButtonProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} color="inherit">
      <NewTaskIcon />
    </IconButton>
  )
}
