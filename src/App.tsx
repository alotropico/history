import useItems from './api/useItems'
import Board from './features/board'

export default function App() {
  const [items, sets] = useItems()
  return <Board items={items} sets={sets} />
}
