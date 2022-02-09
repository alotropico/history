import greece from '../data/greece.json'
import sparta from '../data/sparta.json'
import athens from '../data/athens.json'
import macedon from '../data/macedon.json'
import seleucus from '../data/seleucus.json'
import rome from '../data/rome.json'
import carthage from '../data/carthage.json'
import persia from '../data/persia.json'
import hebrews from '../data/hebrews.json'
import other from '../data/other.json'

import parseItems from '../utils/parseItems'

import { DbItem, DataItem, DbSet, DbSetInfo } from '../types'

export default function useItems(): [DataItem[], DbSetInfo[]] {
  const dataSets = [greece, hebrews, athens, sparta, rome, macedon, seleucus, persia, carthage, other]
  // const dataSets = [other, hebrews, persia, rome, carthage, sparta, greece, athens, macedon]
  return [
    dataSets.map((set) => parseItems(parseItemsBySet(set))).reduce((acc, set) => [...acc, ...set], []),
    dataSets.map((set) => set.info),
  ]
}

function parseItemsBySet(set: DbSet): DbItem[] {
  // Copy 'info.name' from the set into each item and return a spread array with all items

  return set.items.map((item) => {
    return {
      ...item,
      set: item.set || set.info.name,
      theme: {
        color: set.info.color || '999999',
      },
    }
  })
}
