import Item from './components/Item'
import useParsedItems from './hooks/useParsedItems'
import { ICanvas } from './types'
import style from './style/Canvas.module.scss'

export default function Canvas({ items }: ICanvas) {
  const [parsedItems, layers] = useParsedItems(items, -580, -281)
  return <div className={style.canvas}>{parsedItems.map((item) => item?.name && <Item key={item.id} {...item} />)}</div>
  // return <table>{parsedItems.map((item) => item?.name && <Item key={item.id} {...item} />)}</table>
}
