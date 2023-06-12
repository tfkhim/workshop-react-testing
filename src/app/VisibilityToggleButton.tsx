import { FC } from 'react'
import IconButton from '@mui/material/IconButton'

import VisibileIcon from '@mui/icons-material/VisibilityOutlined'
import InvisibleIcon from '@mui/icons-material/VisibilityOffOutlined'

export type VisibilityToggleButtonProps = {
  visible: boolean
  onToggle: () => void
}

export const VisibilityToggleButton: FC<VisibilityToggleButtonProps> = ({
  visible,
  onToggle,
}) => {
  return (
    <IconButton onClick={onToggle} color="inherit">
      {visible ? <VisibileIcon /> : <InvisibleIcon />}
    </IconButton>
  )
}
