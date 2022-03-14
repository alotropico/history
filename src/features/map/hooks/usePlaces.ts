import { useEffect, useState } from 'react'

import { pointsType, renderPlacesType } from '../types'
import { placeType } from '../../board/types'

export default function usePlaces(dictionary: pointsType, currentPlaces: placeType[]): renderPlacesType {
  const [filteredPlaces, setFilteredPlaces] = useState<any>([])

  useEffect(() => {
    setFilteredPlaces(
      dictionaryToFeatures(dictionary)
        .features.map((entry) => {
          const renderPlace = currentPlaces.find((place) => place.name === entry.properties.name)
          return renderPlace ? { ...entry, properties: { ...entry.properties, ...renderPlace } } : null
        })
        .filter((p) => p)
    )
  }, [dictionary, currentPlaces])

  // useEffect(() => {
  //   //console.log(filteredPlaces)
  // }, [JSON.stringify(filteredPlaces)])

  return filteredPlaces
}

const dictionaryToFeatures = (dictionary: any): any => {
  return {
    type: 'FeatureCollection',
    features: dictionary.map((item) => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [item.coordinates[0], item.coordinates[1]] },
      properties: { name: item?.label, wikidataId: item?.wikidataId },
    })),
  }
}
