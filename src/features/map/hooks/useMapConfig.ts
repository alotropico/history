import { useEffect, useState } from 'react'
import { arrayDif } from '../../../utils/arrays'

import { renderPlacesType } from '../types'

export default function useMapConfig(points: renderPlacesType) {
  const [config, setConfig] = useState<any>([0, 0, 2])

  useEffect(() => {
    setConfig(getCentroid(getCoordinates(points)))
  }, [arrayDif(points)])

  return {
    rotate: [-config[0], -config[1], 0],
    tilt: 0,
    scale: config[2] * 0.75,
    distance: 2.8,
  }
}

const getCoordinates = (points) => {
  return points.map((d) => d.geometry.coordinates)
}

const getCentroid = (arr: [number, number][]): [number, number, number] => {
  if (!arr.length) return [45, 36, 3600]
  let minX, maxX, minY, maxY
  arr.forEach((a) => {
    minX = a[0] < minX || minX === undefined ? a[0] : minX
    maxX = a[0] > maxX || maxX === undefined ? a[0] : maxX
    minY = a[1] < minY || minY === undefined ? a[1] : minY
    maxY = a[1] > maxY || maxY === undefined ? a[1] : maxY
  })
  const w = maxX - minX
  const h = maxY - minY
  const size = h > w ? 360 * (180 / h) : 360 * (180 / w)
  return [(minX + maxX) / 2, (minY + maxY) / 2, size < 800 ? 800 : size > 3600 ? 3600 : size]
}
