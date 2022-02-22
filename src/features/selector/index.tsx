import { CategoriesProps } from './types'
import style from './style/Selector.module.scss'
import Cross from '../../components/cross'
import Icon from '../../components/icons'

export default function Selector({ tax, filters, onSetFilter, theme, useIcon = false }: CategoriesProps) {
  const handleChange = (id) =>
    onSetFilter((filters) => (filters.includes(id) ? filters.filter((filter) => filter !== id) : [...filters, id]))

  const containerClasses = [
    theme && style?.[theme] ? style[theme] : '',
    style.taxonomies,
    useIcon ? style.icons : '',
  ].join(' ')

  return (
    <div className={containerClasses}>
      {tax.map((taxonomy) => {
        const name = taxonomy?.name ? taxonomy.name : taxonomy
        const itemClasses = [
          style.taxonomy,
          filters.includes(name) ? style.selected : filters.length ? style.off : '',
        ].join(' ')

        const spanStyle = taxonomy?.color && { backgroundColor: '#' + taxonomy.color }

        return taxonomy?.name ? (
          <div key={taxonomy.name} onClick={() => handleChange(taxonomy.name)} className={itemClasses}>
            <span style={spanStyle} />
            {taxonomy.name}
          </div>
        ) : (
          <div key={taxonomy} onClick={() => handleChange(taxonomy)} className={itemClasses}>
            {useIcon ? <Icon name={taxonomy} /> : taxonomy}
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
