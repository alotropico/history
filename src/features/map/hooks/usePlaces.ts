import { useEffect, useState } from 'react'

import { pointsType, renderPlacesType } from '../types'
import { placeType } from '../../board/types'

export default function usePlaces(dictionary: pointsType, currentPlaces: placeType[]): renderPlacesType {
  const [filteredPlaces, setFilteredPlaces] = useState<any>([])

  useEffect(() => {
    setFilteredPlaces(
      dictionary.features
        .map((entry) => {
          const renderPlace = currentPlaces.find((place) => place.name === entry.properties.name)
          return renderPlace ? { ...entry, properties: { ...entry.properties, ...renderPlace } } : null
        })
        .filter((p) => p)
    )
  }, [dictionary, currentPlaces])

  return filteredPlaces
}
