import { SpatialItem } from '../../../types'

export default function Item(props: SpatialItem & { i: number }) {
  const { type, set, name, fullName, tax, place, s, e, sd, ed, dates, spatial, theme, i } = props

  const title = `${fullName || name} ${dates && `(${dates})`}`

  const setClass = `item_set--${set.toLowerCase().replaceAll(' ', '-')}`

  const itemStyle = {
    left: spatial.l + '%',
    width: spatial.w + '%',
    height: spatial.h + '%',
    bottom: spatial.b + '%',
  }

  const wrapperStyle = {
    background: theme.background,
  }

  return (
    <div
      className={['item', setClass].join(' ')}
      style={itemStyle}
      title={title}
      tabIndex={i}
      onFocus={() => console.log(title)}>
      <div style={wrapperStyle} className={'item_wrapper'}>
        <div className={'item_name'}>{name}</div>
      </div>
    </div>
  )
}
