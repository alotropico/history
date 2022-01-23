import { BoardProps } from './types'
import Canvas from '../canvas'
import style from './style/Board.module.scss'
import useRenderItems from './hooks/useRenderItems'

export default function Board({ items }: BoardProps) {
  const bounds = [-800, 100]
  const renderItems = useRenderItems(items, bounds[0], bounds[1])

  return <Canvas items={renderItems} />
}
