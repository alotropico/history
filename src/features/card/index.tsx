import Desc from './components/Desc'
import Links from './components/Links'
import Events from './components/Events'
import Cross from '../../components/cross'
import style from './style/Card.module.scss'
import useClickOutside from '../../hooks/useClickOutside'
import { useRef } from 'react'

export default function Card(props) {
  const { handleClose, name, fullName, theme, events, properties, e: end, set } = props

  console.log(props)

  const { imageUrl, life, desc, claims } = properties
  const { occupation } = claims

  const title = fullName || name

  const cardColor = {
    background: theme.background,
  }

  const ref = useRef(null)
  useClickOutside(ref, () => handleClose())

  const links = {
    ...(properties?.wikidataId && { wikidataId: properties.wikidataId }),
    ...(properties?.wikipediaId && { wikipediaId: properties.wikipediaId }),
    google: title,
    youtube: title,
  }

  return (
    <div className={style.card} ref={ref}>
      <div className={style.top}>
        <h2>{title}</h2>
        <Cross onClick={handleClose} className={style.cross} />
      </div>

      {set && <p>{set}</p>}

      {life && (
        <div className={style.date} style={cardColor}>
          {life.map((item) => {
            const { label, date, place, comment } = item
            return (
              <p key={label}>
                <span className={style.label}>{label}:</span>{' '}
                {(place || date) && (
                  <span className={style.spacetime}>{[place, date].filter((i) => i).join(', ')}</span>
                )}{' '}
                {comment && <span className={style.comment}>{comment}</span>}
              </p>
            )
          })}
        </div>
      )}

      <Events events={events} tags={occupation} bottomSeparator={Boolean(desc)} itemEnd={end} />

      <Desc image={imageUrl} desc={desc} />

      <Links links={links} />
    </div>
  )
}
