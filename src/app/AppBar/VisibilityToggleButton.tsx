import { FC, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import type { CommonProps } from '@mui/material/OverridableComponent'

import VisibileIcon from '@mui/icons-material/VisibilityOutlined'
import InvisibleIcon from '@mui/icons-material/VisibilityOffOutlined'

export const VisibilityToggleButton: FC<CommonProps> = (commonProps) => {
  const [visible, setVisible] = useState(false)

  const toggle = () => setVisible((oldState) => !oldState)

  return (
    <IconButton {...commonProps} onClick={toggle}>
      {visible ? <VisibileIcon /> : <InvisibleIcon />}
    </IconButton>
  )
}
