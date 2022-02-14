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
        const name = occ?.name ? occ.name : occ
        const itemClasses = [
          style.category,
          filters.includes(name) ? style.selected : filters.length ? style.off : '',
        ].join(' ')

        const spanStyle = occ?.color && { backgroundColor: '#' + occ.color }

        return occ?.name ? (
          <div key={occ.name} onClick={() => handleChange(occ.name)} className={itemClasses}>
            <span style={spanStyle} />
            {occ.name}
          </div>
        ) : (
          <div key={occ} onClick={() => handleChange(occ)} className={itemClasses}>
            {useIcon ? <Icon name={occ} /> : occ}
          </div>
        )
      })}
      {Boolean(filters.length) && <Cross onClick={() => onSetFilter([])} theme='light' className={style.cross} />}
    </div>
  )
}

// {sets.map((set) => {
//   const itemClasses = [
//     style.category,
//     filters.includes(set.name) ? style.selected : filters.length ? style.off : '',
//   ].join(' ')
//   const spanStyle = { backgroundColor: '#' + set.color }

//   return (

//   )
// })}
