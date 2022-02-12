import { useContext } from 'react'

import { BoardContext } from '../board'
import { CategoriesProps } from './types'
import style from './style/Occs.module.scss'
import Cross from '../../components/cross'
import Icon from '../../components/icons'
import { iconType } from '../../components/icons/types/types'

export default function Occs({ occs, filters }: CategoriesProps) {
  const { setOccFilters } = useContext(BoardContext)

  const handleChange = (id) =>
    setOccFilters((filters) => (filters.includes(id) ? filters.filter((filter) => filter !== id) : [...filters, id]))

  return (
    <div className={style.categories}>
      {occs.map((occ) => {
        const itemClasses = [
          style.category,
          filters.includes(occ) ? style.selected : filters.length ? style.off : '',
        ].join(' ')

        return (
          <div key={occ} onClick={() => handleChange(occ)} className={itemClasses}>
            <Icon name={occ} />
          </div>
        )
      })}
      {Boolean(filters.length) && <Cross onClick={() => setOccFilters([])} theme='light' className={style.cross} />}
    </div>
  )
}
