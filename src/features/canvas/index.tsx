import Item from './components/Item'
import { CanvasProps } from './types'
import './style/Item.scss'
import style from './style/Canvas.module.scss'

export default function Canvas({ items }: CanvasProps) {
  return (
    <div className={style.canvas}>
      {items.map((item, i) => item?.name && <Item key={item.id} i={i + 1} {...item} />)}
    </div>
  )
}
