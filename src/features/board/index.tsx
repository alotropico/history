import { createContext, useCallback, useEffect, useState } from 'react'

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
import Map from '../map'

export const BoardContext = createContext<any>(() => null)

const sortTaxonomy = (a, b) => (a > b ? 1 : a < b ? -1 : 0)

export default function Board({ items, sets, occs }: BoardProps) {
  const [filters, setFilters] = useState([])

  const [occFilters, setOccFilters] = useState([])

  const [tagFilters, setTagFilters] = useState([])

  const [highlights, setHighlights] = useState('')

  const filteredItems = useFilterItems(items, [
    { filters, prop: 'set' },
    { filters: occFilters, prop: 'icon' },
    { filters: tagFilters, prop: 'place' },
  ])

  const highlightedItems = useHighlightItems(filteredItems, highlights)

  const [renderItems, start, end] = useRenderItems(highlightedItems)

  const dates = `(${end - start} years: ${parseYear(start)} to ${parseYear(end)})`

  const [selected, setSelected] = useState(null)

  const [tags, setTags] = useState<any>([])

  useEffect(() => {
    setTags(
      [
        ...new Set(
          filteredItems
            .filter((i) => i?.display || i.displayId === 'place')
            .map((item) => item?.place)
            .filter((place) => place)
        ),
      ].sort(sortTaxonomy)
    )
  }, [JSON.stringify(filteredItems)])

  useEffect(() => {
    setTagFilters([])
  }, [JSON.stringify(filters), JSON.stringify(occFilters)])

  const contextMethods: any = {
    setSelected,
    setFilters,
    setHighlights,
    setOccFilters,
    setTagFilters,
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
            <Occs occs={sets.map((set) => set)} filters={filters} onSetFilter={useCallback(setFilters, [filters])} />
            <Occs
              occs={occs || []}
              filters={occFilters}
              onSetFilter={useCallback(setOccFilters, [occFilters])}
              useIcon={true}
            />
            <Occs occs={tags || []} filters={tagFilters} onSetFilter={useCallback(setTagFilters, [tagFilters])} />
            <Map places={tags} />
            {selected && <Card {...selected} handleClose={() => setSelected(null)} />}
          </aside>
        </div>

        {/* <footer /> */}
      </div>
    </BoardContext.Provider>
  )
}
