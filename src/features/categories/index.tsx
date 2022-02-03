import { useContext } from 'react'

import { BoardContext } from '../board'
import { CategoriesProps } from './types'
import style from './style/Categories.module.scss'
import Cross from '../../components/cross'

export default function Categories({ sets, filters }: CategoriesProps) {
  const { setFilters } = useContext(BoardContext)

  const handleChange = (id) =>
    setFilters((filters) => (filters.includes(id) ? filters.filter((filter) => filter !== id) : [...filters, id]))

  return (
    <div className={style.categories}>
      {sets.map((set) => {
        const itemClasses = [
          style.category,
          filters.includes(set.name) ? style.selected : filters.length ? style.off : '',
        ].join(' ')
        const spanStyle = { backgroundColor: '#' + set.color }

        return (
          <div key={set.name} onClick={() => handleChange(set.name)} className={itemClasses}>
            <span style={spanStyle} />
            {set.name}
          </div>
        )
      })}
      {Boolean(filters.length) && <Cross onClick={() => setFilters([])} theme='light' className={style.cross} />}
    </div>
  )
}
