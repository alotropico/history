import { BoardProps } from './types'
import Canvas from '../canvas'
import Scale from '../scale'
import Card from '../card'
import Categories from '../categories'
import style from './style/Board.module.scss'
import useRenderItems from './hooks/useRenderItems'
import parseYear from '../../utils/parseYear'
import { createContext, useState } from 'react'

export const BoardContext = createContext<Function>(() => null)

export default function Board({ items, sets }: BoardProps) {
  const [renderItems, start, end] = useRenderItems(items)

  const dates = `(${end - start} years: ${parseYear(start)} to ${parseYear(end)})`

  const [selected, setSelected] = useState(null)

  return (
    <BoardContext.Provider value={setSelected}>
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
          <Categories sets={sets} />
        </footer>
      </div>
      {selected && <Card {...selected} handleClose={() => setSelected(null)} />}
    </BoardContext.Provider>
  )
}
