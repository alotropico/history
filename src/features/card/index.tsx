import { useRef } from 'react'
import Desc from './components/Desc'
import Links from './components/Links'
import useClickOutside from '../../hooks/useClickOutside'
import style from './style/Card.module.scss'

export default function Card(props) {
  const { set, name, fullName, place, dates, theme, desc, handleClose, source, sourceLink } = props

  const title = fullName || name

  const cardColor = {
    background: theme.background,
  }

  const ref = useRef(null)
  useClickOutside(ref, () => handleClose())

  return (
    <div className={style.card} ref={ref}>
      <div className={style.top}>
        <span onClick={handleClose}>
          <span />
        </span>
      </div>

      <h2>{title}</h2>

      {dates && (
        <p className={style.date} style={cardColor}>
          {dates}
        </p>
      )}

      <Desc desc={desc} source={source} sourceLink={sourceLink} />

      <Links fullName={fullName} name={name} place={place} set={set} />
    </div>
  )
}
