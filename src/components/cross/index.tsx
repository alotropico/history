import { crossProps } from './types'
import style from './style/Cross.module.scss'

export default function Cross({ onClick, theme, className }: crossProps) {
  const styles = [style.cross, theme === 'light' ? style.lightTheme : '', className].filter((s) => s).join(' ')

  return (
    <span onClick={onClick} className={styles}>
      <span />
    </span>
  )
}
