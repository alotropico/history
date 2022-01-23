import { SpatialItem } from '../../../types'
import style from '../style/Item.module.scss'

export default function Item(props: SpatialItem) {
  const { type, set, name, fullName, tax, place, s, e, sd, ed, dates, spatial } = props

  const title = `${fullName || name} ${dates && `(${dates})`}`

  const setClass = `set-${set.toLowerCase().replaceAll(' ', '-')}`

  const itemStyle = {
    left: spatial.l + '%',
    width: spatial.w + '%',
    height: spatial.h + '%',
    bottom: spatial.b + '%',
  }

  return (
    <div className={[style.item, setClass].join(' ')} style={itemStyle} title={title}>
      <div className={style.wrapper}>
        <div className={style.name}>{name}</div>
      </div>
    </div>
  )
}
