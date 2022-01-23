import macedon from '../data/macedon.json'
import athens from '../data/athens.json'
import sparta from '../data/sparta.json'
import greece from '../data/greece.json'
// import wars from '../data/ancient-wars.json'

import { DbItem } from '../types'

export default function useItems(): DbItem[] {
  // Copy 'info.name' from the set into each item and return a spread array with all items
  return [macedon, athens, sparta, greece]
    .map((set) => set.items.map((item) => ({ ...item, set: item.set || set.info.name })))
    .reduce((acc, set) => [...acc, ...set], [])
}
