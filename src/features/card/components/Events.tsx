import parseYear from '../../../utils/parseYear'

import style from '../style/Events.module.scss'

export default function Events({ events, bottomSeparator, itemEnd, tags }) {
  // Filter out events without name
  const eventsWithContent = events ? events.filter((e) => e?.name) : []

  // Save events in an object to consolidate different time periods for the same name
  const eventsObj = {}
  eventsWithContent.forEach((e) => {
    const life = [parseYear(e?.start), e?.end === 'end' ? parseYear(itemEnd) : parseYear(e?.end)]
      .filter((d) => d)
      .join(' - ')

    eventsObj[e.name] = [...(eventsObj?.[e.name] || []), life || null].filter((e) => e)
  })

  return (
    <>
      {eventsWithContent.length ? (
        <div className={[style.events, bottomSeparator ? style.bottomSeparator : ''].join(' ')}>
          {Object.keys(eventsObj).map((k) => {
            const nums = eventsObj[k]
            const life =
              nums.length > 2 && nums.every((d) => d.indexOf(' BC') > -1)
                ? nums.map((d) => d.replaceAll(' BC', '')).join(', ') + ' BC'
                : nums.join(', ')

            return (
              <span key={k} title={`${k}: ${life}`}>
                <span title={k}>{k}</span> {life && <span>{life}</span>}
              </span>
            )
          })}
        </div>
      ) : (
        <></>
      )}
      {tags && (
        <div className={style.tags}>
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      )}
    </>
  )
}
