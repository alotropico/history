import useItems from '../../api/useItems'
import Board from '../board'
import useParseData from './parser/useParseData'

export default function Main() {
  const { data, error } = useItems('test')

  const items = useParseData(data)

  return <>{data && <Board items={items} />}</>
}
