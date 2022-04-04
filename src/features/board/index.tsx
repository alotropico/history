import { createContext, useState } from 'react'

import Canvas from '../canvas'
import Scale from '../scale'
import Card from '../card'
import Panel from '../../components/panel'
import Selector from '../selector'
import Search from '../search'

import style from './style/Board.module.scss'
import useHighlightItems from './hooks/useHighlightItems'
import useRenderItems from './hooks/useRenderItems'
import parseYear from '../../utils/parseYear'

import { BoardProps } from './types'
import Map from '../map'
import Portal from '../../components/portal/portal'
import useFilterSets from './hooks/useFilterSets'

export const BoardContext = createContext<any>(() => null)

export default function Board({ items }: BoardProps) {
  const [filteredItems, filterSets, userInput, changeUserInput, places, placeFilters, setPlaceFilters] =
    useFilterSets(items)

  const [highlights, setHighlights] = useState('')
  const highlightedItems = useHighlightItems(filteredItems, highlights)

  const [renderItems, start, end] = useRenderItems(highlightedItems)

  const life = `(${end - start} years: ${parseYear(start)} to ${parseYear(end)})`

  const [selected, setSelected] = useState(null)

  const contextMethods: any = {
    setSelected,
    setHighlights,
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
              <h1 className={style.title}>Spacetime charts</h1>
              <p className={style.status}>
                {renderItems.filter((item) => item.display).length} items {life}
              </p>
            </header>

            <Panel title='Highlight' className={style.highlight}>
              <Search />
            </Panel>

            {filterSets.map((set, i) => (
              <Panel
                title={`${set.name} (${userInput[i].length}/${set.children.length})`}
                key={set.name}
                className={style.asidePanel}
                openDefault={false}>
                <Selector
                  tax={set.children}
                  filters={userInput?.[i] ? userInput[i] : []}
                  onSetFilter={changeUserInput}
                  id={i}
                />
              </Panel>
            ))}

            <Panel className={style.map}>
              <Map places={places.filter((p) => (placeFilters.length ? placeFilters.includes(p.name) : true))} />
            </Panel>
          </aside>
        </div>
      </div>

      {selected && (
        <Portal>
          <Panel theme='standalone'>
            <Card {...selected} handleClose={() => setSelected(null)} />
          </Panel>
        </Portal>
      )}
    </BoardContext.Provider>
  )
}
