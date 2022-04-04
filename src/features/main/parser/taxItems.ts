import { ParsedItem, DataItem } from '../../../types'
import { sortByValue } from '../../../utils/arrays'
import { getRandomHex, hex2rgba, hex2rgbaDarken } from '../../../utils/colors'

const placeProperties = ['country', 'birth', 'residence', 'death']

export default function taxItems(items: DataItem[]): DataItem[] {
  const categories = {}

  // Search for placeProperties on each item
  // and create an object counting occurrences of their values

  items.forEach((item) => {
    const itemCategories = getFirstProperty(item?.properties?.claims || {}, placeProperties)

    if (itemCategories) {
      itemCategories.forEach((category) => {
        if (!categories?.[category]) categories[category] = { count: 0, items: [] }
        categories[category].count++
        categories[category].items.push(item?.id || '?')
      })
    }
  })

  // Create sorted array of categories with colors

  const colors = Object.keys(categories)
    .map((k) => ({ ...categories[k], key: k.toLowerCase() }))
    .sort((a, b) => sortByValue('count', b, a))
    .map((category, i) => ({ ...category, color: getRandomHex(i) }))

  // Assign category and color to each item
  // the first category (higher count) that matches is assigned

  const ret = items
    .map((item) => {
      const itemStr = stringifyProperties(item?.properties?.claims, placeProperties)
      const found = colors.find((color) => itemStr.indexOf(color.key) > -1)
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
  const solid = hex2rgba(color, 0.5)
  const alpha = hex2rgba(color, 0)
  return sd && ed
    ? `linear-gradient(90deg, ${alpha} 0%, ${solid} 30%, ${solid} 50%, ${solid} 70%, ${alpha} 100%)`
    : sd
    ? `linear-gradient(90deg, ${alpha} 0%, ${solid} 30%, ${solid} 100%)`
    : ed
    ? `linear-gradient(90deg, ${solid} 0%, ${solid} 70%, ${alpha} 100%)`
    : solid
}

const getFirstProperty = (item, properties) => {
  for (let i = 0; i < properties.length; i++) {
    if (item?.[properties[i]]) return item[properties[i]]
  }

  return ''
}

const stringifyProperties = (item, properties) => {
  const ret: any = []

  for (let i = 0; i < properties.length; i++) {
    if (item?.[properties[i]]) ret.push(item[properties[i]].join(', '))
  }

  return ret.join(', ').toLowerCase()
}
