import { CategoriesProps } from './types'
import style from './style/Categories.module.scss'

export default function Categories({ sets }: CategoriesProps) {
  return (
    <div className={style.categories}>
      {sets.map((set) => {
        const style = { backgroundColor: '#' + set.color }
        return (
          <div key={set.name}>
            <span style={style} />
            {set.name}
          </div>
        )
      })}
    </div>
  )
}
