import { useContext } from 'react'

import { ItemProps } from '../types'
import { BoardContext } from '../../board'
import Icon from '../../../components/icons'

export default function Item(props: ItemProps) {
  const { set, name, fullName, dates, spatial, theme, tabIndex, highlight, display, canvas } = props

  const title = `${fullName || name} ${dates && `(${dates})`}`

  const setClass = [`item_set--${set.toLowerCase().replaceAll(' ', '-')}`, highlight ? 'highlight' : '']

  const { setSelected } = useContext(BoardContext)

  console.log(spatial.b)

  const itemStyle = {
    left: `${spatial.l * 100}%`,
    bottom: `${spatial.b * 100}%`,
    //transform: `translate(${(canvas?.width || 1) * spatial.l}px, ${-(canvas?.height || 1) * spatial.b}px)`,
    // width: spatial.w + '%',
    width: `${spatial.w * 100}%`,
    height: `${spatial.h * 100}%`,
  }

  const bgStyle = {
    background: theme.background,
    //width: `${canvas?.width ? Math.round(canvas.width * spatial.w - 1) : 1}px`,
    //height: `${canvas?.height ? Math.round(canvas.height * spatial.h - 1) : 1}px`,
    // transform: `scale(${spatial.w - 0.001}, ${spatial.h - 0.004})`,
    //transform: `scale(${spatial.w}, ${spatial.h})`,
  }

  return (
    <div
      className={[...setClass, 'item', !display ? 'hide' : 'show'].join(' ')}
      style={itemStyle}
      title={title}
      tabIndex={tabIndex}
      onClick={() => setSelected(props)}
      onFocus={() => setSelected(props)}>
      <div className={'item_bg'} style={bgStyle} />
      <div className={'item_name'}>
        {theme?.icon && <Icon name={theme.icon} />}
        <span>{name}</span>
      </div>
    </div>
  )
}
