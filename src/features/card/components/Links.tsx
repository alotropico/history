import style from '../style/Links.module.scss'

export default function Links({ fullName, name, place, set }) {
  const title = fullName || name

  const searchId = `${title} ${place || set}`

  return (
    <div className={style.bottom}>
      <ul>
        <li>
          <a href={`https://en.wikipedia.org/w/index.php?search=${title}`} target='_blank' rel='noreferrer'>
            Wikipedia
          </a>
        </li>
        <li>
          <a href={`https://www.perseus.tufts.edu/hopper/searchresults?q=${title}`} target='_blank' rel='noreferrer'>
            Perseus Library
          </a>
        </li>
        <li>
          <a href={`https://www.google.com/search?q=${searchId}`} target='_blank' rel='noreferrer'>
            Google
          </a>
        </li>
        <li>
          <a href={`https://www.youtube.com/results?search_query=${searchId}`} target='_blank' rel='noreferrer'>
            Youtube
          </a>
        </li>
      </ul>
    </div>
  )
}
