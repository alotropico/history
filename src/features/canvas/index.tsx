import Item from './components/Item'
import useParsedItems from './hooks/useParsedItems'
import { CanvasProps } from './types'
import style from './style/Canvas.module.scss'
import DataTable from '../dataTable'

export default function Canvas({ items }: CanvasProps) {
  const bounds = [-580, -280]
  const [parsedItems, layers] = useParsedItems(items, bounds[0], bounds[1])
  // return <DataTable items={items} />
  return <div className={style.canvas}>{parsedItems.map((item) => item?.name && <Item key={item.id} {...item} />)}</div>
}
