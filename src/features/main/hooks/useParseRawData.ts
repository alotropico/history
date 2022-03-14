import { useEffect, useState } from 'react'
import parseItems from '../../../utils/parseItems'
import { DbItem, DbSet, DbTheme } from '../../../types'

export default function useParseRawData(data) {
  const [items, setItems] = useState<any>([])
  const [sets, setSets] = useState<any>([])

  useEffect(() => {
    if (data?.items) {
      setItems([data].map((set) => parseItems(parseItemsBySet(set))).reduce((acc, set) => [...acc, ...set], []))
      setSets([data].map((set) => set.info))
    }
  }, [JSON.stringify(data)])

  return { items: items, sets }
}

const getWordName = (s) => {
  if (typeof s !== 'string') return ''

  return s
    .replace(/ *\([^)]*\) */g, '')
    .replace(/,.*$/, '')
    .replace(/of.*$/, '')
    .split(' ')
    .map((i) => i.trim())
    .filter((i) => i?.length > 3)
    .pop()
}

const parseItemsBySet = (set: DbSet): DbItem[] => {
  return set.items.slice(0).map((item) => {
    const { claims, ...rest } = item
    const { start, end, ...restClaims } = claims
    return {
      ...rest,
      set: item.set || set.info.name,
      place: item.place || set.info.place,
      ...restClaims,
      ...(start && start?.precision > 7 && start?.time && { start: start.time }),
      ...(end && end?.precision > 7 && end?.time && { end: end.time }),
      fullName: rest?.name,
      name: getWordName(rest?.name),
      theme: {
        color: getMatchColors(set.info?.themes, item) || set.info.color || '999999',
      },
    }
  })
}

const colorsFromProperties = ['tax', 'place', 'gender', 'events']

const getMatchColors = (themes?: DbTheme[], item?: DbItem): string => {
  if (!themes || !item) return ''

  return (
    themes.filter((theme) => {
      return colorsFromProperties.some((prop) => {
        const values = item?.[prop]
        return (
          values &&
          (prop === 'events'
            ? values.some((event) => event?.name && event.name.toLowerCase().indexOf(theme.match) > -1)
            : values.toLowerCase().indexOf(theme.match) > -1)
        )
      })
    })?.[0]?.color || ''
  )
}
