import { useContext } from 'react'

import { ItemProps } from '../types'
import { BoardContext } from '../../board'
import Icon from '../../../components/icons'

export default function Item(props: ItemProps) {
  const { set, name, fullName, dates, spatial, theme, tabIndex, highlight, display, layers } = props

  const title = `${fullName || name} ${dates && `(${dates})`}`

  const setClass = [`item_set--${set.toLowerCase().replaceAll(' ', '-')}`, highlight ? 'highlight' : '']

  const { setSelected } = useContext(BoardContext)

  console.log(layers)

  const itemStyle = {
    left: `${spatial.l * 100}%`,
    bottom: `${spatial.b * 100}%`,
    width: `${spatial.w * 100}%`,
    height: `${spatial.h * 100}%`,
  }

  const bgStyle = {
    background: theme.background,
  }

  return (
    <div
      className={[...setClass, 'item', !display ? 'hide' : 'show'].join(' ')}
      style={itemStyle}
      title={title}
      tabIndex={tabIndex}
      onClick={() => setSelected(props)}
      onFocus={() => setSelected(props)}>
      <div className={'item_bg'} style={bgStyle}>
        {layers && Boolean(layers?.length) && <Layers layers={layers} background={theme.layerBackground} />}
      </div>
      <div className={'item_name'}>
        {theme?.icon && <Icon name={theme.icon} />}
        <span>{name}</span>
      </div>
    </div>
  )
}

function Layers({ layers, background }) {
  return layers.map((layer, i) => {
    const style = {
      background,
      left: `${layer.l * 100}%`,
      width: `${layer.w * 100}%`,
    }
    return <div key={i} className={'item_bg--inner'} style={style} />
  })
}
