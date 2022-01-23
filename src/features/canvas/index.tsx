import Item from './components/Item'
import { CanvasProps } from './types'
import './style/Item.scss'
import style from './style/Canvas.module.scss'

export default function Canvas({ items }: CanvasProps) {
  return <div className={style.canvas}>{items.map((item) => item?.name && <Item key={item.id} {...item} />)}</div>
}
