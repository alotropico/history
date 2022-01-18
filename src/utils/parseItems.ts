import { DbItem, IItem } from '../types'

export default function parseItems(items: DbItem[]): IItem[] {
  return items
    .map((item, i) => parseItem(item, i))
    .sort((a, b) => sortByNumericValue('e', a, b))
    .sort((a, b) => sortByNumericValue('s', a, b))
}

function parseItem(item: DbItem, i): IItem {
  const type = item?.type || 'person'
  const { s, e, sd, ed } = getDatePoints(item?.start, item?.end, item?.events || [], type)
  return {
    ...item,
    id: i,
    dates: datesToString(item?.start, item?.end),
    type,
    s,
    e,
    sd,
    ed,
  }
}

// From 'start' & 'end' dates, get the actual visual points I want the item to be displayed
function getDatePoints(start, end, events, type) {
  const strictStart = start || getEventsDatePoints(events, false, 'start')
  const strictEnd = end || getEventsDatePoints(events, true, 'end')

  const [s, sd] = start ? [start, false] : pushDatePoints(strictStart || strictEnd, false, type)
  const [e, ed] = end ? [end, false] : pushDatePoints(strictEnd || strictStart, true, type)

  return { s, e, sd, ed }
}

// Get max (forward) or min (!forward) value of the 'key' property from 'events' array
function getEventsDatePoints(events, forward, key): number | undefined {
  return events.reduce((acc, item) => {
    const itemVal = item?.[key] && !isNaN(item[key]) && item[key]
    return !acc ? itemVal : !itemVal ? acc : (forward && itemVal > acc) || (!forward && itemVal < acc) ? itemVal : acc
  }, undefined)
}

// Move beginning and finishing datePoints according to item type
function pushDatePoints(point, forward, type): [number, boolean] {
  switch (type) {
    case 'person':
      return [forward ? point + 30 : point - 30, true]

    default:
      return [point, false]
  }
}

function datesToString(start, end): string {
  const dates: any = []
  start ? dates.push(start) : dates.push('unknown')
  end && dates.push(end)
  return dates.every((d) => d === 'unknown') ? 'unknown dates' : dates.map((y) => parseYear(y)).join(' - ')
}

function sortByNumericValue(value, a, b): number {
  return isNaN(a?.[value]) ? (isNaN(b?.[value]) ? 0 : -1) : !isNaN(b?.[value]) ? a?.[value] - b?.[value] : 1
}

function parseYear(y): string {
  return isNaN(y) ? y : y < 0 ? Math.abs(y) + ' BC' : y.toString()
}
