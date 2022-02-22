import { useEffect, useState } from 'react'

export default function usePlaces(dictionary, currentPlaces): any {
  const [filteredPlaces, setFilteredPlaces] = useState([])

  useEffect(() => {
    setFilteredPlaces(
      dictionary
        .map((entry) => {
          const renderPlace = currentPlaces.find((place) => place.name === entry.properties.name)
          return renderPlace ? { ...entry, properties: { ...entry.properties, ...renderPlace } } : null
        })
        .filter((p) => p)
    )
  }, [dictionary, currentPlaces])

  return filteredPlaces
}
