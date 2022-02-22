import * as d3 from 'd3'
import * as d3g from 'd3-geo-projection'

import { MapProps } from './types'
import style from './style/Map.module.scss'
// import world from './assets/world-land-low.geo.json'
import world from './assets/world.geo.json'
import points from './assets/places.json'
import usePlaces from './hooks/usePlaces'

const canvasW = 960
const canvasH = 960 * 0.5 // 484

export default function Map({ places }: MapProps) {
  const mapConfig = {
    rotate: [-45, -36, 0],
    tilt: 0,
    scale: 820,
    distance: 2,
  }

  const mapFeatures: Array<any> = world.features

  const pointFeatures: Array<any> = usePlaces(points.features, places)

  const path = d3.geoPath()

  const projection = d3g
    .geoSatellite()
    .center([0, 0])
    .rotate([0, 0, 0])
    .fitExtent(
      [
        [0, 0],
        [canvasW, canvasH],
      ],
      { type: 'Sphere' }
    )
    .rotate(mapConfig.rotate)
    .tilt(mapConfig.tilt)
    .scale(mapConfig.scale)
    .distance(mapConfig.distance)

  path.projection(projection)

  return (
    <div className={style.mapWrapper}>
      <div className={style.map}>
        <svg viewBox={`0 0 ${canvasW} ${canvasH}`}>
          <g className={style.sphere}>
            <path d={path({ type: 'Sphere' })} />
          </g>

          <g className={style.land}>
            {mapFeatures.map((d, i) => (
              <path key={i} d={path(d)} />
            ))}
          </g>

          <g className={style.places}>
            {pointFeatures
              .filter((d) => d)
              .map((d, i) => {
                const centroid = path.centroid(d.geometry)
                const { color, reach } = d.properties
                return (
                  centroid[0] && (
                    <circle r={6 + reach / 3} fill={'#' + color} key={i} cx={centroid[0]} cy={centroid[1]} />
                  )
                )
              })}
          </g>
        </svg>
      </div>
    </div>
  )
}
