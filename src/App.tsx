import useItems from './api/useItems'
import Board from './features/board'

export default function App() {
  const [items, sets] = useItems()
  const occs = [...new Set(items.map((item) => item?.icon).filter((icon) => icon))]

  return <Board items={items} sets={sets} occs={occs} />
}
