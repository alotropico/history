import useItems from '../../api/useItems'
import Board from '../board'
import useGetTaxonomies from './hooks/useGetTaxonomies'
import useParseRawData from './hooks/useParseRawData'

export default function Main() {
  const { data, error } = useItems('rome')

  const { items, sets } = useParseRawData(data)

  const { taxonomies, places } = useGetTaxonomies(items)

  return <>{data && <Board items={items} sets={sets} tax={taxonomies} places={places} />}</>
}
