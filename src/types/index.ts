type ItemTypes = 'person' | 'battle' | 'period' | 'event' | string
export type ItemEvent = {
  name: string
  start?: number | 'end' | string
  end?: number | 'end' | string
}
export type DbItem = {
  type?: ItemTypes
  tax?: 'source' | string
  name: string
  fullName?: string
  start?: number
  end?: number
  events?: ItemEvent[]
  desc?: string
  place?: string
  set: string
}
export type RenderItem = {
  s?: number
  e?: number
  sd?: boolean
  ed?: boolean
}
export type DataItem = DbItem &
  RenderItem & {
    id: number
    type: ItemTypes
    dates: string
  }
export type SpatialItem = DataItem & {
  spatial: {
    i: number
    b: number
    l: number
    w: number
    h: number
  }
}

export type DataItems = DataItem[]

export type SpatialItems = SpatialItem[]
