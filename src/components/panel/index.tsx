import { panelProps } from './types'
import style from './style/Panel.module.scss'

export default function Panel({ title, theme, className, draggable, toggable, children }: panelProps) {
  const classes = [style.panel, theme && style?.[theme] && style[theme], className || ''].filter((c) => c).join(' ')
  return (
    <div className={classes}>
      {Boolean(title) && (
        <div className={style.top}>
          <h4>{title}</h4>
        </div>
      )}
      <div className={style.content}>{children}</div>
    </div>
  )
}
