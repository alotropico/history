type ItemTypes = 'person' | 'battle' | 'period' | 'event' | string

export type DbTheme = {
  match: string
  color: string
}

export type DbSetInfo = {
  name: string
  color?: string
  lightColor?: string
  themes?: DbTheme[]
  place?: string
}
export type DbSet = {
  info: DbSetInfo
  items: DbItem[]
}
export type ItemEvent = {
  name?: string
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
  set?: string
  theme?: any
  source?: string
  sourceLink?: string
  color?: string
  gender?: string
}
export type RenderItem = {
  s?: number
  e?: number
  ev?: number
  sd?: boolean
  ed?: boolean
}
export type DataItem = DbItem &
  RenderItem & {
    id: string
    type: ItemTypes
    dates: string
    theme?: any
    display?: boolean
    displayId?: boolean | string
    layers?: { name?: string; l: number; w: number }[]
    icon?: string
  }
export type SpatialItem = DataItem & {
  set: string
  highlight?: boolean
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
