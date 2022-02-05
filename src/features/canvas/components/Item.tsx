import { useContext } from 'react'

import { SpatialItem } from '../../../types'
import { BoardContext } from '../../board'
import Icon from '../../../components/icons'

export default function Item(props: SpatialItem & { i: number }) {
  const { type, set, name, fullName, tax, place, s, e, sd, ed, dates, spatial, theme, i, highlight, events } = props

  const title = `${fullName || name} ${dates && `(${dates})`}`

  const setClass = [`item_set--${set.toLowerCase().replaceAll(' ', '-')}`, highlight ? 'highlight' : '']

  const { setSelected } = useContext(BoardContext)

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
      className={[...setClass, 'item'].join(' ')}
      style={itemStyle}
      title={title}
      tabIndex={i}
      onClick={() => setSelected(props)}
      onFocus={() => setSelected(props)}>
      <div style={wrapperStyle} className={'item_wrapper'}>
        <div className={'item_name'}>
          {theme?.icon && <Icon name={theme.icon} />}
          <span>{name}</span>
        </div>
      </div>
    </div>
  )
}
