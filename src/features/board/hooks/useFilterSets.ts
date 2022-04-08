import { useEffect, useState } from 'react'
import { DataItems } from '../../../types'
import { arrayDif, sortByValue } from '../../../utils/arrays'
import useFilterItems from './useFilterItems'
import useTaxonomies from './useTaxonomies'

const filterSetsConfig = [
  { key: 'languages', name: 'Languages' },
  { key: 'places', name: 'Places' },
  //{ key: 'ethnicity', name: 'Ethnicity' },
  //{ key: 'faction', name: 'Faction' },
  //{ key: 'causeOfDeath', name: 'Cause of Death' },
  { key: 'death', name: 'Manner of Death' },
  { key: 'occupation', name: 'Occupation' },
  { key: 'gender', name: 'Gender' },
]

const getFilterSets = (items: DataItems) => {
  return filterSetsConfig.map((set) => ({
    ...set,
    children: getChildren(items, set.key),
  }))
}

const getChildren = (items, id) => {
  const newChildren: any = {}

  items
    .filter((item) => item?.display || item.displayId === id)
    .forEach((item) => {
      if (item?.properties?.claims?.[id]) {
        const children = Array.isArray(item?.properties?.claims?.[id])
          ? item.properties.claims[id]
          : [item?.properties?.claims?.[id] || '']

        children
          .filter((child) => child)
          .forEach((child) => {
            if (!newChildren?.[child]) {
              newChildren[child] = {
                name: child,
                color: item.theme.color,
                reach: 1,
              }
            } else {
              newChildren[child].reach++
            }
          })
      }
    })

  return Object.entries(newChildren)
    .map((child) => child[1])
    .sort((a, b) => sortByValue('reach', b, a))
}

export default function useFilterSets(items: DataItems): [DataItems, any[], any[], any, any[], any[], any] {
  const [filterSets, setFilterSets] = useState<any>([])

  const [userInput, setUserInput] = useState<any>([])

  // const [filters, setFilters] = useState([])

  // const [typeFilters, setTypeFilters] = useState([])

  const [placeFilters, setPlaceFilters] = useState<any>([])

  const filteredItems = useFilterItems(items, [
    ...filterSets.map((set, i) => ({ filters: userInput[i], prop: set.key })),
    { filters: placeFilters, prop: 'country' },
  ])

  //console.log(filterSets)

  // const sets = useTaxonomies(filteredItems, 'causeOfDeath')

  // const types = useTaxonomies(filteredItems, 'occupation')

  const places = useTaxonomies(filteredItems, 'country')

  useEffect(() => {
    setFilterSets(getFilterSets(filteredItems))
  }, [JSON.stringify(filteredItems)])

  useEffect(() => {
    setUserInput(Array.from(Array(10).keys()).map((a) => []))
  }, [filterSets.length])

  useEffect(() => {
    setPlaceFilters([])
  }, [arrayDif(filterSets)])

  const changeUserInput = (id, key) => {
    return setUserInput((userInput) =>
      userInput.map((set, i) => {
        return i !== id
          ? set
          : Array.isArray(key)
          ? key
          : set.includes(key)
          ? [...set].filter((it) => it !== key)
          : [...set, key]
      })
    )
  }

  return [filteredItems, filterSets, userInput, changeUserInput, places, placeFilters, setPlaceFilters]
}
