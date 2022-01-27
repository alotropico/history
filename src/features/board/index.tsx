import { BoardProps } from './types'
import Canvas from '../canvas'
import Card from '../card'
import style from './style/Board.module.scss'
import useRenderItems from './hooks/useRenderItems'
import parseYear from '../../utils/parseYear'
import { createContext, useEffect, useState } from 'react'

export const BoardContext = createContext<Function>(() => null)

export default function Board({ items }: BoardProps) {
  const [renderItems, start, end] = useRenderItems(items)

  const dates = `(${parseYear(start)} to ${parseYear(end)})`

  const [selected, setSelected] = useState(null)

  useEffect(() => {
    console.log(selected)
  }, [selected])

  return (
    <BoardContext.Provider value={setSelected}>
      <div className={style.board}>
        <div className={style.top}>
          <span className={style.status}>{renderItems.length} items</span>
          <h1 className={style.title}>Chronology of People from Antiquity</h1>
          <p className={style.status}>{dates}</p>
        </div>
        <Canvas items={renderItems} />
      </div>

      {selected && <Card {...selected} />}
    </BoardContext.Provider>
  )
}
