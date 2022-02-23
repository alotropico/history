import * as d3 from 'd3'
import * as d3g from 'd3-geo-projection'

// import world from './assets/world-land-low.geo.json'
import world from './assets/world.geo.json'
import points from './assets/places.json'
import usePlaces from './hooks/usePlaces'
import useMapConfig from './hooks/useMapConfig'

import { MapProps } from './types'
import style from './style/Map.module.scss'

const canvasW = 960
const canvasH = 960 * 0.62 // 484

export default function Map({ places }: MapProps) {
  const mapFeatures = world.features

  const pointFeatures = usePlaces(points, places)

  const mapConfig = useMapConfig(pointFeatures)

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
                    <circle r={10 + reach / 2} fill={'#' + color} key={i} cx={centroid[0]} cy={centroid[1]} />
                  )
                )
              })}
          </g>
        </svg>
      </div>
    </div>
  )
}
