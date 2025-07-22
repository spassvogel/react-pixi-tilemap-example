export type TiledMapData = {
  width: number
  height: number
  tilewidth: number
  tileheight: number
  infinite: boolean
  backgroundcolor: string | null
  orientation: Orientation
  renderorder: RenderOrder
  tilesets: TiledTilesetData[]
  layers: TiledLayerData[]
}

export type TiledTilesetData = {
  columns: number
  firstgid: number
  image: string
  imagewidth: number
  imageheight: number
  tilewidth: number
  tileheight: number
  tilecount: number
  name: string
  margin: number // todo:
  spacing: number // todo
  tiles?: TileData[]
}

export type TiledTilesetExternalData = {
  firstgid: number
  source: string
}

export type TileData =  {
  id: number
  properties?: TiledProperty[]
  animation?: TiledFrame[]
}

export type TiledFrame = {
  duration: number
  tileid: number
}

export type TiledLayerData = {
  type: typeof TiledLayerType.imagelayer
  id: number
  name: string
  properties?: TiledProperty[]
  x: number
  y: number
  visible?: boolean

  image: string
  imagewidth: number
  imageheight: number
  offsetx?: number
  offsety?: number
  repeatx?: boolean
  repeaty?: boolean
} | {
  type: typeof TiledLayerType.tilelayer
  id: number
  name: string
  properties?: TiledProperty[]
  x: number
  y: number
  visible?: boolean

  encoding?: 'base64'
  compression?: 'gzip'
  data: number[]
  height: number
  opacity: number
  width: number
} | {
  id: number
  name: string
  properties?: TiledProperty[]
  x: number
  y: number
  visible?: boolean

  type: typeof TiledLayerType.objectgroup
  objects: TiledObjectData[]
  height: number
  opacity: number
  width: number
}

export type TiledObjectData = {
  gid: number
  id: number
  name: string
  properties?: TiledProperty[]
  type: string
  visible: boolean
  width: number
  height: number
  x: number
  y: number
}

export const TiledLayerType = {
  tilelayer: 'tilelayer',
  imagelayer: 'imagelayer',
  objectgroup: 'objectgroup'
} as const
export type TiledLayerType = typeof TiledLayerType[keyof typeof TiledLayerType]


export type TiledProperty = {
  name: string,
  type: string,
  value: unknown
}

export const Orientation = {
  orthagonal: 'orthagonal',
  isometric: 'isometric',
  staggered: 'staggered',
  hexagonal: 'hexagonal'
} as const
export type Orientation = typeof Orientation[keyof typeof Orientation]

export const RenderOrder = {
  rightUp: 'right-up',
  rightDown: 'right-down',
  leftUp: 'left-up',
  leftDown: 'left-down'
} as const
export type RenderOrder = typeof RenderOrder[keyof typeof RenderOrder]
