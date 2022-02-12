import { createContext, useState } from 'react'

import Canvas from '../canvas'
import Scale from '../scale'
import Card from '../card'
import Categories from '../categories'
import Occs from '../occs'
import Search from '../search'

import style from './style/Board.module.scss'
import useFilterItems from './hooks/useFilterItems'
import useHighlightItems from './hooks/useHighlightItems'
import useRenderItems from './hooks/useRenderItems'
import parseYear from '../../utils/parseYear'

import { BoardProps } from './types'

export const BoardContext = createContext<any>(() => null)

export default function Board({ items, sets, occs }: BoardProps) {
  const [filters, setFilters] = useState([])

  const [occFilters, setOccFilters] = useState([])

  const [highlights, setHighlights] = useState('')

  const filteredItems = useFilterItems(items, [
    { filters, prop: 'set' },
    { filters: occFilters, prop: 'icon' },
  ])

  const highlightedItems = useHighlightItems(filteredItems, highlights)

  const [renderItems, start, end] = useRenderItems(highlightedItems)

  const dates = `(${end - start} years: ${parseYear(start)} to ${parseYear(end)})`

  const [selected, setSelected] = useState(null)

  const contextMethods: any = {
    setSelected,
    setFilters,
    setHighlights,
    setOccFilters,
  }

  return (
    <BoardContext.Provider value={contextMethods}>
      <div className={style.board}>
        <div className={style.main}>
          <main>
            <Scale start={start} end={end} />
            <Canvas items={renderItems} />
          </main>

          <aside>
            <header>
              <h1 className={style.title}>Early Classical Antiquity</h1>
              <p className={style.status}>
                {renderItems.filter((item) => item.display).length} items {dates}
              </p>
            </header>
            <Search />
            <Categories
              sets={sets.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))}
              filters={filters}
            />
            <Occs occs={occs || []} filters={occFilters} />
            {selected && <Card {...selected} handleClose={() => setSelected(null)} />}
          </aside>
        </div>

        {/* <footer /> */}
      </div>
    </BoardContext.Provider>
  )
}
