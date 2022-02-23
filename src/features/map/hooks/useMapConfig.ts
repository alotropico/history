import { useEffect, useState } from 'react'

import dif from '../../../utils/arrayDif'
import { renderPlacesType } from '../types'

export default function useMapConfig(points: renderPlacesType) {
  const [config, setConfig] = useState<any>([0, 0, 2])

  useEffect(() => {
    setConfig(getCentroid(getCoordinates(points)))
  }, [dif(points)])

  return {
    rotate: [-config[0], -config[1], 0],
    tilt: 0,
    scale: 160 * (180 / config[2]),
    distance: 2,
  }
}

const getCoordinates = (points) => {
  return points.map((d) => d.geometry.coordinates)
}

const getCentroid = (arr: [number, number][]): [number, number, number] => {
  if (!arr.length) return [45, 36, 45]
  let minX, maxX, minY, maxY
  arr.forEach((a) => {
    minX = a[0] < minX || minX === undefined ? a[0] : minX
    maxX = a[0] > maxX || maxX === undefined ? a[0] : maxX
    minY = a[1] < minY || minY === undefined ? a[1] : minY
    maxY = a[1] > maxY || maxY === undefined ? a[1] : maxY
  })
  const w = maxX - minX
  const h = maxY - minY
  const size = h > w ? h : w
  return [(minX + maxX) / 2, (minY + maxY) / 2, size < 2 ? 2 : size > 45 ? 45 : size]
}
