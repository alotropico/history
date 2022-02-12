import Desc from './components/Desc'
import Links from './components/Links'
import Cross from '../../components/cross'
import style from './style/Card.module.scss'
import Events from './components/Events'

export default function Card(props) {
  const { set, name, fullName, place, dates, theme, desc, source, sourceLink, events, e, handleClose } = props

  const title = fullName || name

  const cardColor = {
    background: theme.background,
  }

  return (
    <div className={style.card}>
      <div className={style.top}>
        <Cross onClick={handleClose} />
        <h2>{title}</h2>
      </div>

      {dates && (
        <p className={style.date} style={cardColor}>
          {dates}
        </p>
      )}

      <Events events={events} bottomSeparator={Boolean(desc)} itemEnd={e} />

      <Desc desc={desc} source={source} sourceLink={sourceLink} />

      <Links fullName={fullName} name={name} place={place} set={set} />
    </div>
  )
}
