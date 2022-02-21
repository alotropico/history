import * as d3 from 'd3'
import * as d3g from 'd3-geo-projection'
import { feature } from 'topojson-client'
import { Feature, Geometry } from 'geojson'

import { MapProps } from './types'
import style from './style/Map.module.scss'
import world from './assets/world.geo.json'
import points from './assets/places.json'

export default function Map({ places }: MapProps) {
  const mapConfig = {
    rotate: [-45, -45, 0],
    tilt: 0,
    scale: 750,
    distance: 2,
  }

  //const mapPreFeatures: any = world?.objects?.land && feature(world, world.objects.land)

  const mapFeatures: Array<any> = world.features // mapPreFeatures ? mapPreFeatures.features : []

  const pointFeatures: Array<any> = points.features

  const path = d3.geoPath()

  const projection = d3g
    .geoSatellite()
    .center([0, 0])
    .rotate([0, 0, 0])
    .fitExtent(
      [
        [0, 0],
        [960, 484],
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
        <svg viewBox='0 0 960 484'>
          <g className={style.sphere}>
            <path d={path({ type: 'Sphere' })} />
          </g>
          <g className={style.land}>
            {mapFeatures.map((d, i) => (
              <path key={i} d={path(d)} />
            ))}
          </g>
          <g className={style.place}>
            {pointFeatures
              .filter((d) => d)
              .map((d, i) => {
                const centroid = path.centroid(d.geometry)
                return centroid[0] && <circle r='10' key={i} cx={centroid[0]} cy={centroid[1]} />
              })}
          </g>
        </svg>
      </div>
    </div>
  )
}
