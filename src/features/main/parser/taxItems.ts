import { ParsedItem, DataItem } from '../../../types'
import { sortByValue } from '../../../utils/arrays'
import { getRandomHex, hex2rgba, hex2rgbaDarken } from '../../../utils/colors'

export default function taxItems(items: DataItem[]): DataItem[] {
  const countries = {}

  items.forEach((item) => {
    const itemCountries = item?.properties?.claims?.country

    if (itemCountries) {
      itemCountries.forEach((country) => {
        if (!countries?.[country]) countries[country] = { count: 0, items: [] }
        countries[country].count++
        countries[country].items.push(item.fullName)
      })
    }
  })

  const colors = Object.keys(countries)
    .map((k) => ({ ...countries[k], key: k.toLowerCase() }))
    .sort((a, b) => sortByValue('count', b, a))
    .map((country, i) => ({ ...country, color: getRandomHex(i) }))

  // colors.forEach((i) => console.log(`%c ${i.key} - ${i.count} `, 'background: #' + i.color + '; color: #ffffff'))

  const ret = items
    .map((item) => {
      const itemStr = JSON.stringify(item).toLowerCase()
      const found = colors.find((color) => itemStr.indexOf(color.key) > 0)
      const color = found?.color || '999999'
      const set = found?.key || 'undefined'
      return {
        ...item,
        color,
        set,
        theme: {
          color,
          background: bgColor(color, item.sd, item.ed),
          layerBackground: hex2rgbaDarken(color, 0.5),
        },
      }
    })
    .sort((a, b) => sortByValue('color', a, b))

  return ret
}

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
