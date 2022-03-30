type eventType = {
  name?: string
  start?: number | 'end' | string
  end?: number | 'end' | string
}

type claimsType = {
  type?: string[]
  start?: any
  end?: any
  events?: any[]
  birth?: string[]
  residence?: string[]
  death?: string[]
  occupation?: string[]
  country?: string[]
}

export type DbItem = {
  name?: string
  title?: string
  extract?: string
  imageUrl?: string
  pageid?: string
  wikidataId?: string
  id: string
  claims?: claimsType
}

export type ParsedItem = {
  id: string
  name: string
  fullName: string
  type?: string
  start?: number
  end?: number
  place?: string[]
  events?: eventType[]
  properties: {
    extract?: string
    imageUrl?: string
    pageid?: string
    wikidataId?: string
    life?: string
    claims?: claimsType
  }
}

export type RenderItem = {
  s?: number
  e?: number
  ev?: number
  sd?: boolean
  ed?: boolean
}

export type DataItem = ParsedItem &
  RenderItem & {
    theme: {
      color?: string
      icon?: string
      background?: string
      layerBackground?: string
    }
    display?: boolean
    displayId?: boolean | string
    layers?: { name?: string; l: number; w: number }[]
    icon?: string
    set?: string
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
