import { useEffect, useState } from 'react'

import dif from '../../../utils/arrayDif'
import { placeType } from '../types'

export default function usePlaces(items): placeType[] {
  const [places, setPlaces] = useState<any>([])

  useEffect(() => {
    const newPlaces: any = {}

    items
      .filter((i) => i?.display || i.displayId === 'place')
      .forEach((item) => {
        if (item.place) {
          const places = Array.isArray(item.place) ? item.place : [item.place]

          places.forEach((place) => {
            if (!newPlaces?.[place]) {
              newPlaces[place] = {
                name: place,
                color: item.theme.color,
                reach: 1,
              }
            } else {
              newPlaces[place].reach++
            }
          })
        }
      })

    setPlaces(Object.entries(newPlaces).map((item) => item[1]))
  }, [dif(items)])

  return places
}
