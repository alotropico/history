import { createContext, useState } from 'react'

import Canvas from '../canvas'
import Scale from '../scale'
import Card from '../card'
import Categories from '../categories'
import Search from '../search'

import style from './style/Board.module.scss'
import useFilterItems from './hooks/useFilterItems'
import useHighlightItems from './hooks/useHighlightItems'
import useRenderItems from './hooks/useRenderItems'
import parseYear from '../../utils/parseYear'

import { BoardProps } from './types'

export const BoardContext = createContext<any>(() => null)

export default function Board({ items, sets }: BoardProps) {
  const [filters, setFilters] = useState([])

  const [highlights, setHighlights] = useState('')

  const filteredItems = useFilterItems(items, filters)

  const highlightedItems = useHighlightItems(filteredItems, highlights)

  const [renderItems, start, end] = useRenderItems(highlightedItems)

  const dates = `(${end - start} years: ${parseYear(start)} to ${parseYear(end)})`

  const [selected, setSelected] = useState(null)

  const contextMethods: any = {
    setSelected,
    setFilters,
    setHighlights,
  }

  return (
    <BoardContext.Provider value={contextMethods}>
      <div className={style.board}>
        <header>
          <h1 className={style.title}>Chronology of Renowned People from the Early Classical Antiquity</h1>
          <p className={style.status}>
            {renderItems.length} items {dates}
          </p>
        </header>
        <main>
          <Scale start={start} end={end} />
          <Canvas items={renderItems} />
        </main>
        <footer>
          <Categories sets={sets.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))} filters={filters} />
          <Search />
        </footer>
      </div>
      {selected && <Card {...selected} handleClose={() => setSelected(null)} />}
    </BoardContext.Provider>
  )
}
