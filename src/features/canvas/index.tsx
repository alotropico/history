import Item from './components/Item'
import useElementSize from '../../hooks/useElementSize'
import { CanvasProps } from './types'
import style from './style/Canvas.module.scss'

export default function Canvas({ items }: CanvasProps) {
  const [squareRef, { width, height }]: any = useElementSize()

  return (
    <div className={style.canvas} ref={squareRef}>
      {items.map(
        (item, i) =>
          item?.name && (
            <Item key={item.id} tabIndex={item.display ? i + 1 : undefined} canvas={{ width, height }} {...item} />
          )
      )}
    </div>
  )
}
