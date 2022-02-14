import { useContext } from 'react'

import { ItemProps } from '../types'
import { iconType } from '../../../components/icons/types/types'
import { BoardContext } from '../../board'
import Icon from '../../../components/icons'
import style from '../style/Item.module.scss'

export default function Item(props: ItemProps) {
  const { set, name, fullName, dates, spatial, theme, tabIndex, highlight, display, layers, icon } = props

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
      tabIndex={tabIndex}
      onClick={() => setSelected(props)}
      onFocus={() => setSelected(props)}>
      <div className={style.bg} style={bgStyle}>
        {layers && Boolean(layers?.length) && <Layers layers={layers} background={theme.layerBackground} />}
      </div>
      <div className={style.name}>
        {icon && <Icon name={icon || ''} />}
        <span>{name}</span>
      </div>
    </div>
  )
}

function Layers({ layers, background }) {
  return layers.map((layer, i) => {
    const left = layer.l > 0.99 ? `calc(${layer.l * 100}% - 1px)` : `${layer.l * 100}%`
    const layerStyle = {
      background:
        layer?.name &&
        (layer.name.toLowerCase().indexOf('battle') > -1 ||
          layer.name.toLowerCase().indexOf('siege') > -1 ||
          layer.name.toLowerCase().indexOf('expedition') > -1)
          ? 'rgba(255, 255, 255, .3)'
          : background,
      left,
      width: `${layer.w * 100}%`,
    }
    const classes = [style.inner, layer.w < 0.01 && style.short].join(' ')
    return <div key={i} className={classes} style={layerStyle} title={layer?.name} />
  })
}
