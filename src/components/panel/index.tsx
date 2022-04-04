import { useState } from 'react'

import { panelProps } from './types'
import style from './style/Panel.module.scss'

export default function Panel({
  title,
  theme,
  className,
  draggable,
  toggable,
  openDefault = true,
  children,
}: panelProps) {
  const [open, setOpen] = useState(openDefault)

  const classes = [style.panel, theme && style?.[theme] && style[theme], className || '', open && style.open]
    .filter((c) => c)
    .join(' ')

  return (
    <div className={classes}>
      {Boolean(title) && (
        <div className={style.top} onClick={() => setOpen(!open)}>
          <h4>{title}</h4>
        </div>
      )}
      {open && <div className={style.content}>{children}</div>}
    </div>
  )
}
