import { SpatialItem, SpatialItems } from '../../../types'

export type CanvasProps = {
  items: SpatialItems
}

export type ItemProps = SpatialItem & {
  tabIndex: number
  canvas?: {
    width: number
    height: number
  }
}
