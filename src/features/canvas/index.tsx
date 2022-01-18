import Item from './components/Item'
import useParsedItems from './hooks/useParsedItems'
import { ICanvas } from './types'
import style from './style/Canvas.module.scss'

export default function Canvas({ items }: ICanvas) {
  const bounds = [-580, -281]
  const parsedItems = useParsedItems(items, bounds[0], bounds[1])
  return (
    <table className={style.canvas}>
      <tbody>{parsedItems.map((item) => item?.name && <Item key={item.id} {...item} />)}</tbody>
    </table>
  )
}
