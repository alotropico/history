import parseYear from './parseYear'
import { hex2rgba, hex2rgbaDarken } from './colors'
import { toPercentage } from './numbers'
import { DbItem, DataItem } from '../types'

export default function parseItems(items: DbItem[]): DataItem[] {
  return (
    items
      .map((item, i) => parseItem(item, i))
      .sort((a, b) => sortByNumericValue('e', a, b))
      //.sort((a, b) => sortByNumericValue('s', a, b))
      .sort((a, b) => sortByValue('set', a, b))
  )
}

// Parse individual item
const parseItem = (item: DbItem, i): DataItem => {
  const type = item?.type || 'person'
  const { s, e, ev, sd, ed } = getDatePoints(item.name, item?.start, item?.end, item?.events || [], type)
  return {
    ...item,
    theme: {
      ...item.theme,
      background: bgColor(item?.color || item.theme.color, sd, ed),
      layerBackground: hex2rgbaDarken(item?.color || item.theme.color, 0.5),
    },
    icon: getIcon(item.tax || '', item.events || []),
    layers: item?.events ? getLayers(item.events, s, ev) : [],
    id: item.set + '-' + i,
    dates: datesToString(item?.start, item?.end),
    type,
    s,
    e,
    ev,
    sd,
    ed,
  }
}

const getLayers = (events, s, e) => {
  const lapse = e - s
  return events
    .filter((event) => event?.name && event?.start)
    .map((event) => (event?.end && isNaN(event.end) ? { ...event, end: e } : event))
    .map((event) => ({
      name: event?.name,
      l: toPercentage((event.start - s) / lapse),
      w: event?.end ? toPercentage((event.end - event.start) / lapse) : 0,
    }))
}

const king = ['king', 'queen', 'pharaoh', 'emperor', 'basileus', 'dynasty', 'tyrant']
const authority = [
  'consul',
  'censor',
  'dictator',
  'strategos',
  'commander',
  'general',
  'militar',
  'warrior',
  'tribune',
  'praetor',
  'regent',
  'politician',
  'nobleman',
]

const getIcon = (tax, events) => {
  if (arrayHasWords([{ tax: tax }], 'tax', king)) return 'king'
  if (arrayHasWords([{ tax: tax }], 'tax', authority)) return 'authority'
  if (tax) return tax
  if (arrayHasWords(events, 'name', king)) return 'king'
  if (arrayHasWords(events, 'name', authority)) return 'authority'
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
const getDatePoints = (name, start, end, events, type) => {
  // Dates that can actually be known
  const strictStart = start || getEventsDatePoints(events, false, 'start')
  const strictEnd = end || getEventsDatePoints(events, true, 'end')
  const dif = strictEnd - strictStart

  // Points to be occupied in the graph, including diffuse zones
  const [s, sd] = start ? [start, false] : pushDatePoints(strictStart || strictEnd, false, type, dif || 0, end)
  const [realE, ed] = end ? [end, false] : pushDatePoints(strictEnd || strictStart, true, type, dif || 0, start)

  // Extend zone to a minimum of years to fit labels
  const realDif = realE - s
  const nameLength = name.length < 10 ? name.length : 10
  const wordLength = name.split(' ').filter((w) => w.length > 3).length - 1
  const min = 40 + nameLength + wordLength * 40
  const e = realDif < min ? realE + min - realDif : realE

  return { s, e, ev: realE, sd, ed }
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
