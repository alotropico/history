import useItems from './api/useItems'
import Board from './features/board'

export default function App() {
  const [items, sets] = useItems()
  const occs = [...new Set(items.map((item) => item?.icon).filter((icon) => icon))].sort(sortTaxonomy)
  const tags = [...new Set(items.map((item) => item?.place).filter((place) => place))].sort(sortTaxonomy)

  return <Board items={items} sets={sets} occs={occs} tags={tags} />
}

const sortTaxonomy = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
