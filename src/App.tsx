import useItems from './api/useItems'
import Board from './features/board'

export default function App() {
  const items = useItems()
  return <Board items={items} />
}
