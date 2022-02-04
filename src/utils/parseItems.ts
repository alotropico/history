import parseYear from './parseYear'
import hex2rgba from './hex2Rgba'
import { DbItem, DataItem } from '../types'

export default function parseItems(items: DbItem[]): DataItem[] {
  return items
    .map((item, i) => parseItem(item, i))
    .sort((a, b) => sortByNumericValue('e', a, b))
    .sort((a, b) => sortByNumericValue('s', a, b))
    .sort((a, b) => sortByValue('set', a, b))
}

// Parse individual item
const parseItem = (item: DbItem, i): DataItem => {
  const type = item?.type || 'person'
  const { s, e, sd, ed } = getDatePoints(item?.start, item?.end, item?.events || [], type)
  return {
    ...item,
    theme: {
      ...item.theme,
      background: bgColor(item.theme.color, sd, ed),
      icon: getIcon(item.tax || '', item.events || []),
    },
    id: item.set + '-' + i,
    dates: datesToString(item?.start, item?.end),
    type,
    s,
    e,
    sd,
    ed,
  }
}

const getIcon = (tax, events) => {
  if (tax === 'knowledge') return 'knowledge'
  if (arrayHasWords(events, 'name', ['king', 'queen', 'pharaoh', 'emperor', 'basileus'])) return 'king'
  if (arrayHasWords(events, 'name', ['consul', 'censor', 'dictator', 'strategos'])) return 'consul'
}

const arrayHasWords = (ar, prop, words) =>
  ar.some((a) => words.some((word) => a?.[prop]?.toLowerCase().indexOf(word) > -1))

const bgColor = (color, sd, ed) => {
  const solid = hex2rgba(color, 0.9)
  const alpha = hex2rgba(color, 0)
  return sd && ed
    ? `linear-gradient(90deg, ${alpha} 0%, ${solid} 30%, ${solid} 50%, ${solid} 70%, ${alpha} 100%)`
    : sd
    ? `linear-gradient(90deg, ${alpha} 0%, ${solid} 30%, ${solid} 100%)`
    : ed
    ? `linear-gradient(90deg, ${solid} 0%, ${solid} 70%, ${alpha} 100%)`
    : solid
}

// From 'start' & 'end' dates, get the actual visual points I want the item to be displayed
const getDatePoints = (start, end, events, type) => {
  const strictStart = start || getEventsDatePoints(events, false, 'start')
  const strictEnd = end || getEventsDatePoints(events, true, 'end')
  const dif = strictEnd - strictStart

  const [s, sd] = start ? [start, false] : pushDatePoints(strictStart || strictEnd, false, type, dif || 0, end)
  const [e, ed] = end ? [end, false] : pushDatePoints(strictEnd || strictStart, true, type, dif || 0, start)

  return { s, e, sd, ed }
}

// Get max (forward) or min (!forward) value of the 'key' property from 'events' array
const getEventsDatePoints = (events, forward, key): number | undefined => {
  return events.reduce((acc, item) => {
    const itemVal = item?.[key] && !isNaN(item[key]) && item[key]
    return !acc ? itemVal : !itemVal ? acc : (forward && itemVal > acc) || (!forward && itemVal < acc) ? itemVal : acc
  }, undefined)
}

// Move beginning and finishing datePoints according to item type
const pushDatePoints = (point, forward, type, dif, double): [number, boolean] => {
  const fullGap = double ? 60 - dif : 30 - dif / 2
  const gap = fullGap > 0 ? fullGap : 0
  switch (type) {
    case 'person':
      return [forward ? point + gap : point - gap, true]

    default:
      return [point, false]
  }
}

const datesToString = (start, end): string => {
  const dates: any = []
  start ? dates.push(start) : dates.push('unknown')
  end && dates.push(end)
  return dates.every((d) => d === 'unknown') ? 'unknown dates' : dates.map((y) => parseYear(y)).join(' - ')
}

const sortByValue = (value, a, b): number => {
  return a?.[value] == b?.[value] ? 0 : a?.[value] > b?.[value] ? 1 : -1
}

const sortByNumericValue = (value, a, b): number => {
  return isNaN(a?.[value]) ? (isNaN(b?.[value]) ? 0 : -1) : !isNaN(b?.[value]) ? a?.[value] - b?.[value] : 1
}
