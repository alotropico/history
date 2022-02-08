import Item from './components/Item'
import useElementSize from '../../hooks/useElementSize'
import { CanvasProps } from './types'
import './style/Item.scss'
import style from './style/Canvas.module.scss'

export default function Canvas({ items }: CanvasProps) {
  const [squareRef, { width, height }]: any = useElementSize()

  return (
    <div className={style.canvas} ref={squareRef}>
      {items.map(
        (item, i) => item?.name && <Item key={item.id} tabIndex={i + 1} canvas={{ width, height }} {...item} />
      )}
    </div>
  )
}
