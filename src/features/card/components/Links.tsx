import style from '../style/Links.module.scss'

export default function Links({ links }) {
  return (
    <div className={style.bottom}>
      <ul>
        {Object.keys(links).map((k) => {
          const src = getLink(k, links[k])

          return src ? (
            <li key={k}>
              <a href={src} target='_blank' rel='noreferrer'>
                {getLinkText(k)}
              </a>
            </li>
          ) : (
            ''
          )
        })}
      </ul>
    </div>
  )
}

const getLink = (label, id) => {
  switch (label) {
    case 'wikidataId':
      return `https://www.wikidata.org/wiki/${id}`

    case 'wikipediaId':
      return `https://en.wikipedia.org/wiki?curid=${id}`

    case 'google':
      return `https://www.google.com/search?q=${id}`

    case 'youtube':
      return `https://www.youtube.com/results?search_query=${id}`

    case 'perseus':
      return `https://www.perseus.tufts.edu/hopper/searchresults?q=${id}`

    default:
      return null
  }
}

const getLinkText = (str) => {
  switch (str) {
    case 'wikidataId':
      return 'Wikidata'

    case 'wikipediaId':
      return 'Wikipedia'

    case 'google':
      return 'Google'

    case 'youtube':
      return 'Youtube'
  }
}
