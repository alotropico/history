import parseYear from '../../../utils/parseYear'

import style from '../style/Events.module.scss'

export default function Events({ events, bottomSeparator, itemEnd }) {
  // Filter out events without name
  const eventsWithContent = events ? events.filter((e) => e?.name) : []

  // Save events in an object to consolidate different time periods for the same name
  const eventsObj = {}
  eventsWithContent.forEach((e) => {
    console.log(e)
    const dates = [parseYear(e?.start), e?.end === 'end' ? parseYear(itemEnd) : parseYear(e?.end)]
      .filter((d) => d)
      .join(' - ')

    eventsObj[e.name] = [...(eventsObj?.[e.name] || []), dates || null].filter((e) => e)
  })

  return eventsWithContent.length ? (
    <div className={[style.events, bottomSeparator ? style.bottomSeparator : ''].join(' ')}>
      {Object.keys(eventsObj).map((k) => {
        const nums = eventsObj[k]
        const dates =
          nums.length > 2 && nums.every((d) => d.indexOf(' BC') > -1)
            ? nums.map((d) => d.replaceAll(' BC', '')).join(', ') + ' BC'
            : nums.join(', ')

        return (
          <span key={k} title={`${k}: ${dates}`}>
            <span title={k}>{k}</span> {dates && <span>{dates}</span>}
          </span>
        )
      })}
    </div>
  ) : (
    <></>
  )
}
