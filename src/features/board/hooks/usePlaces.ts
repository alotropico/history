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
          if (!newPlaces?.[item.place]) {
            newPlaces[item.place] = {
              name: item.place,
              color: item.theme.color,
              reach: 1,
            }
          } else {
            newPlaces[item.place].reach++
          }
        }
      })

    setPlaces(Object.entries(newPlaces).map((item) => item[1]))
  }, [dif(items)])

  return places
}
