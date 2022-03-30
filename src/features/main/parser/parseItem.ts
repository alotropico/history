import { hex2rgba, hex2rgbaDarken } from '../../../utils/colors'
import { round } from '../../../utils/numbers'
import { ParsedItem, DataItem } from '../../../types'
import getDateLegend from '../../../utils/getDateLegend'

// Parse individual item
export default function parseItem(item: ParsedItem): DataItem {
  // console.log(item)
  const type = item?.type?.[0] || 'human'
  const { s, e, ev, sd, ed } = getDatePoints(item.name, item?.start, item?.end, item?.events || [], type)

  const icon = getIcon(item.events || [])

  return {
    ...item,
    properties: {
      ...(item?.properties && item.properties),
      life: getDateLegend(
        item?.start,
        item?.end,
        item?.properties?.claims?.residence?.[0],
        item?.properties?.claims?.birth?.[0],
        item?.properties?.claims?.death?.[0]
      ),
    },
    theme: {
      ...(icon && { icon }),
    },
    layers: item?.events ? getLayers(item.events, s, ev) : [],
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
      l: round((event.start - s) / lapse),
      w: event?.end ? round((event.end - event.start) / lapse) : 0,
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
const knowledge = ['scholarch']

const getIcon = (events) => {
  if (arrayHasWords(events, 'name', king)) return 'king'
  if (arrayHasWords(events, 'name', authority)) return 'authority'
  if (arrayHasWords(events, 'name', knowledge)) return 'knowledge'
}

const arrayHasWords = (ar, prop, words) =>
  ar.some((a) => words.some((word) => a?.[prop]?.toLowerCase().indexOf(word) > -1))

// From 'start' & 'end' life, get the actual visual points I want the item to be displayed
const getDatePoints = (name, start, end, events, type) => {
  // console.log(name, start, end, events, type)
  // Dates that can actually be known
  const strictStart = start || getEventsDatePoints(events, false, 'start')
  const strictEnd = end || getEventsDatePoints(events, true, 'end')
  const dif = strictEnd - strictStart

  // Points to be occupied in the graph, including diffuse zones
  const [s, sd] = start ? [start, false] : pushDatePoints(strictStart || strictEnd, false, type, dif || 0, end)
  const [realE, ed] = end ? [end, false] : pushDatePoints(strictEnd || strictStart, true, type, dif || 0, start)

  // Extend zone to a minimum of years to fit labels
  const realDif = realE - s
  const nameLength = name?.length < 10 ? name?.length : 10
  const wordLength = name?.split(' ').filter((w) => w.length > 3).length - 1
  const min = 20 + nameLength * 2 + wordLength * 2
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
  const fullGap = double ? 50 - dif : 25 - dif / 2
  const gap = fullGap > 0 ? fullGap : 0
  switch (type) {
    case 'human':
    case 'human who may be fictional':
      return [forward ? point + gap : point - gap, true]

    default:
      return [point, false]
  }
}
