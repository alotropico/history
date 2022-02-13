import greece from '../data/greece.json'
import sparta from '../data/sparta.json'
import athens from '../data/athens.json'
import macedon from '../data/macedon.json'
import hellenistic from '../data/hellenistic.json'
import rome from '../data/rome.json'
import carthage from '../data/carthage.json'
import persia from '../data/persia.json'
import hebrews from '../data/hebrews.json'
import other from '../data/other.json'

import parseItems from '../utils/parseItems'

import { DbItem, DataItem, DataItems, DbSet, DbSetInfo, DbTheme } from '../types'

export default function useItems(): [DataItem[], DbSetInfo[]] {
  const dataSets = [greece, hebrews, athens, sparta, rome, hellenistic, macedon, persia, carthage, other]
  // const dataSets = [other, hebrews, persia, rome, carthage, sparta, greece, athens, macedon]
  return [
    dataSets.map((set) => parseItems(parseItemsBySet(set))).reduce((acc, set) => [...acc, ...set], []),
    dataSets.map((set) => set.info),
  ]
}

const parseItemsBySet = (set: DbSet): DbItem[] => {
  // Copy 'info.name' from the set into each item and return a spread array with all items

  return set.items.map((item) => {
    return {
      ...item,
      set: item.set || set.info.name,
      place: item.place || set.info.place,
      theme: {
        color: getMatchColors(set.info?.themes, item) || set.info.color || '999999',
      },
    }
  })
}

const getMatchColors = (themes?: DbTheme[], item?: DbItem): string => {
  if (!themes || !item) return ''

  return (
    themes.filter((theme) => {
      return (
        (item?.tax && item.tax.toLowerCase().indexOf(theme.match) > -1) ||
        (item?.place && item.place.toLowerCase().indexOf(theme.match) > -1) ||
        (item?.gender && item.gender.toLowerCase().indexOf(theme.match) > -1) ||
        (item?.events && item.events.some((event) => event?.name && event.name.toLowerCase().indexOf(theme.match) > -1))
      )
    })?.[0]?.color || ''
  )
}
