import Desc from './components/Desc'
import Links from './components/Links'
import Events from './components/Events'
import Cross from '../../components/cross'
import style from './style/Card.module.scss'
import useClickOutside from '../../hooks/useClickOutside'
import { useRef } from 'react'

export default function Card(props) {
  const { set, name, fullName, place, dates, theme, desc, source, sourceLink, events, e, handleClose } = props

  const title = fullName || name

  const cardColor = {
    background: theme.background,
  }

  const ref = useRef(null)
  useClickOutside(ref, () => handleClose())

  return (
    <div className={style.card} ref={ref}>
      <div className={style.top}>
        <h2>{title}</h2>
        <Cross onClick={handleClose} className={style.cross} />
      </div>

      {dates && (
        <p className={style.date} style={cardColor}>
          {(Array.isArray(place) ? place[0] : place) + ', ' + dates}
        </p>
      )}

      <Events events={events} bottomSeparator={Boolean(desc)} itemEnd={e} />

      <Desc desc={desc} source={source} sourceLink={sourceLink} />

      <Links fullName={fullName} name={name} place={place} set={set} />
    </div>
  )
}
