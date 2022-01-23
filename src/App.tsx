import useItems from './api/useItems'
import parseItems from './utils/parseItems'
import Board from './features/board'

export default function App() {
  const items = parseItems(useItems())
  return (
    <>
      <Board items={items} />
    </>
  )
}
