import { CategoriesProps } from './types'
import style from './style/Occs.module.scss'
import Cross from '../../components/cross'
import Icon from '../../components/icons'

export default function Occs({ occs, filters, onSetFilter, useIcon = false }: CategoriesProps) {
  const handleChange = (id) =>
    onSetFilter((filters) => (filters.includes(id) ? filters.filter((filter) => filter !== id) : [...filters, id]))

  const containerClasses = [style.categories, useIcon ? style.icons : ''].join(' ')

  return (
    <div className={containerClasses}>
      {occs.map((occ) => {
        const itemClasses = [
          style.category,
          filters.includes(occ) ? style.selected : filters.length ? style.off : '',
        ].join(' ')

        return (
          <div key={occ} onClick={() => handleChange(occ)} className={itemClasses}>
            {useIcon ? <Icon name={occ} /> : occ}
          </div>
        )
      })}
      {Boolean(filters.length) && <Cross onClick={() => onSetFilter([])} theme='light' className={style.cross} />}
    </div>
  )
}
