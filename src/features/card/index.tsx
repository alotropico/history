import { useRef } from 'react'

import Desc from './components/Desc'
import Links from './components/Links'
import Cross from '../../components/cross'
import useClickOutside from '../../hooks/useClickOutside'
import style from './style/Card.module.scss'
import parseYear from '../../utils/parseYear'

export default function Card(props) {
  const { set, name, fullName, place, dates, theme, desc, handleClose, source, sourceLink, events, e: end } = props

  const title = fullName || name

  const cardColor = {
    background: theme.background,
  }

  const ref = useRef(null)
  useClickOutside(ref, () => handleClose())

  const filledEvents = events ? events.filter((e) => e?.name) : []

  return (
    <div className={style.card} ref={ref}>
      <div className={style.top}>
        <Cross onClick={handleClose} />
      </div>

      <h2>{title}</h2>

      {dates && (
        <p className={style.date} style={cardColor}>
          {dates}
        </p>
      )}

      {Boolean(filledEvents.length) && (
        <div className={[style.events, desc ? style.withDesc : ''].join(' ')}>
          {filledEvents.map((e, i) => {
            const dates = [parseYear(e?.start), e?.end === 'end' ? parseYear(end) : parseYear(e?.end)]
              .filter((d) => d)
              .join(' - ')
            return (
              <span key={i}>
                {e.name}
                {dates && ` (${dates})`}
              </span>
            )
          })}
        </div>
      )}

      <Desc desc={desc} source={source} sourceLink={sourceLink} />

      <Links fullName={fullName} name={name} place={place} set={set} />
    </div>
  )
}
