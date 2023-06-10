import { FC } from 'react'
import IconButton from '@mui/material/IconButton'
import NewTaskIcon from '@mui/icons-material/PlaylistAddOutlined'
import type { CommonProps } from '@mui/material/OverridableComponent'

export const NewTaskButton: FC<CommonProps> = (commonProps) => {
  return (
    <IconButton {...commonProps}>
      <NewTaskIcon />
    </IconButton>
  )
}
