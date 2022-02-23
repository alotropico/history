import points from '../assets/places.json'
import { placeType } from '../../board/types'

export type pointsType = typeof points

export type renderPlacesType = typeof points.features[0] &
  {
    properties: placeType
  }[] &
  any

export type MapProps = {
  places: placeType[]
}
