import Item from './components/Item'
import useParsedItems from './hooks/useParsedItems'
import { ICanvas } from './types'

export default function Canvas({ items }: ICanvas) {
  const parsedItems = useParsedItems(items, -580, -281)
  return <table>{parsedItems.map((item) => item?.name && <Item key={item.id} {...item} />)}</table>
}
