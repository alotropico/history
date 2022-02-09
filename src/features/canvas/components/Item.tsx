import { useContext } from 'react'

import { ItemProps } from '../types'
import { BoardContext } from '../../board'
import Icon from '../../../components/icons'
import style from '../style/Item.module.scss'

export default function Item(props: ItemProps) {
  const { set, name, fullName, dates, spatial, theme, tabIndex, highlight, display, layers } = props

  const title = `${fullName || name} ${dates && `(${dates})`}`

  const setClass = [highlight ? style.highlight : '']

  const { setSelected } = useContext(BoardContext)

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
      className={[...setClass, style.item, !display ? style.hide : style.show].join(' ')}
      style={itemStyle}
      title={title}
      tabIndex={tabIndex}
      onClick={() => setSelected(props)}
      onFocus={() => setSelected(props)}>
      <div className={style.bg} style={bgStyle}>
        {layers && Boolean(layers?.length) && <Layers layers={layers} background={theme.layerBackground} />}
      </div>
      <div className={style.name}>
        {theme?.icon && <Icon name={theme.icon} />}
        <span>{name}</span>
      </div>
    </div>
  )
}

function Layers({ layers, background }) {
  return layers.map((layer, i) => {
    const layerStyle = {
      background,
      left: `${layer.l * 100}%`,
      width: `${layer.w * 100}%`,
    }
    return <div key={i} className={style.inner} style={layerStyle} />
  })
}
