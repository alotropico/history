import { BoardProps } from './types'
import Canvas from '../canvas'
import style from './style/Board.module.scss'
import useRenderItems from './hooks/useRenderItems'
import parseYear from '../../utils/parseYear'

export default function Board({ items }: BoardProps) {
  const [renderItems, start, end] = useRenderItems(items)

  const dates = `(${parseYear(start)} to ${parseYear(end)})`

  return (
    <div className={style.board}>
      <div className={style.top}>
        <span className={style.status}>{renderItems.length} items</span>
        <h1 className={style.title}>Chronology of People from Antiquity</h1>
        <p className={style.status}>{dates}</p>
      </div>
      <Canvas items={renderItems} />
    </div>
  )
}
