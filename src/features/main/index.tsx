import useItems from '../../api/useItems'
import Board from '../board'
import useGetTaxonomies from './hooks/useGetTaxonomies'
import useParseData from './parser/useParseData'

export default function Main() {
  const { data, error } = useItems('test')

  const items = useParseData(data)

  const { taxonomies } = useGetTaxonomies(items)

  return <>{data && <Board items={items} tax={taxonomies} />}</>
}
