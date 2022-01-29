import { BoardProps } from './types'
import Canvas from '../canvas'
import Card from '../card'
import style from './style/Board.module.scss'
import useRenderItems from './hooks/useRenderItems'
import parseYear from '../../utils/parseYear'
import { createContext, useState } from 'react'

export const BoardContext = createContext<Function>(() => null)

export default function Board({ items }: BoardProps) {
  const [renderItems, start, end] = useRenderItems(items)

  const dates = `(${parseYear(start)} to ${parseYear(end)})`

  const [selected, setSelected] = useState(null)

  return (
    <BoardContext.Provider value={setSelected}>
      <div className={style.board}>
        <div className={style.top}>
          <span className={style.status}>{renderItems.length} items</span>
          <h1 className={style.title}>Chronology of Renowned People from the Early Classical Antiquity</h1>
          <p className={style.status}>{dates}</p>
        </div>
        <Canvas items={renderItems} />
      </div>
      {selected && <Card {...selected} handleClose={() => setSelected(null)} />}
    </BoardContext.Provider>
  )
}
