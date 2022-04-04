import { DataItem, SpatialItems } from '../../../types'

export type placeType = {
  name: string
  color: string
  reach: number
}

export type BoardProps = {
  items: DataItem[]
}

export type useRenderItemsRet = [SpatialItems, number, number]
