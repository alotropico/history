import { useEffect, useState } from 'react'
import { DataItems } from '../../../types'
import { arrayDif } from '../../../utils/arrays'
import useFilterItems from './useFilterItems'
import useTaxonomies from './useTaxonomies'

const filterSetsConfig = [
  { key: 'country', name: 'Country' },
  { key: 'causeOfDeath', name: 'Cause of Death' },
  { key: 'mannerOfDeath', name: 'Manner of Death' },
  { key: 'occupation', name: 'Occupation' },
  { key: 'faction', name: 'Faction' },
  { key: 'otherLanguages', name: 'Languages' },
  { key: 'ethnicity', name: 'Ethnicity' },
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

  return Object.entries(newChildren).map((child) => child[1])
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
      userInput.map((set, i) =>
        i !== id ? set : Array.isArray(key) ? key : set.includes(key) ? set.splice(set.indexOf(key), 1) : [...set, key]
      )
    )
  }

  return [filteredItems, filterSets, userInput, changeUserInput, places, placeFilters, setPlaceFilters]
}
