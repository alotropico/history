import style from './style/Card.module.scss'

export default function Card(props) {
  const { type, set, name, fullName, tax, place, s, e, sd, ed, dates, spatial, theme, i, desc } = props

  const info = { i, type, set, tax, place }

  const title = fullName || name

  const searchId = `${title} ${place || set}`

  const cardColor = {
    background: theme.background,
  }

  return (
    <div className={style.card}>
      <h2>{title}</h2>
      {dates && (
        <p className={style.date} style={cardColor}>
          {dates}
        </p>
      )}
      {desc && (
        <div className={style.body}>
          {desc
            // .replace(/\.+ /gi, '. ')
            .replaceAll('. ', '. \n')
            .split(/(\r?\n+)/gi)
            .map((p, j) => (
              <p key={j}>{p}</p>
            ))}
        </div>
      )}
      <ul>
        <li>
          <a href={`https://www.google.com/search?q=${searchId}`} target='_blank' rel='noreferrer'>
            Search on Google
          </a>
        </li>
        <li>
          <a href={`https://www.youtube.com/results?search_query=${searchId}`} target='_blank' rel='noreferrer'>
            Search on Youtube
          </a>
        </li>
      </ul>
    </div>
  )
}