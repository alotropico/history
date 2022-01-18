type ItemTypes = 'person' | 'battle' | 'period' | 'event' | string
export type IEvent = {
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
  events?: IEvent[]
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
export type IItem = DbItem &
  RenderItem & {
    id: number
    type: ItemTypes
    dates: string
  }
export type SpatialItem = IItem & {
  spatial: any
}
