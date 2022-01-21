import { SpatialItem } from '../../../types'
import style from '../style/Canvas.module.scss'

export default function Item({ type, set, name, fullName, tax, place, s, e, sd, ed, dates, spatial }: SpatialItem) {
  const datePoints = [s, e].filter((a) => a).join(' | ')
  const datePointsBlur = [sd, ed].join(' | ')
  return (
    <div className={style.item}>
      <div>{type}</div>
      <div>{set}</div>
      <div>
        <strong>{name}</strong>
        {fullName && ` (${fullName})`}
      </div>
      <div>{tax}</div>
      <div>{place}</div>
      <div>{dates}</div>
      <div>{datePoints}</div>
      <div>{datePointsBlur}</div>
      <div>
        {spatial.b} | {spatial.l} | {spatial.w}
      </div>
    </div>
  )
  // return (
  //   <tr>
  //     <td>{type}</td>
  //     <td>{set}</td>
  //     <td>
  //       <strong>{name}</strong>
  //       {fullName && ` (${fullName})`}
  //     </td>
  //     <td>{tax}</td>
  //     <td>{place}</td>
  //     <td>{dates}</td>
  //     <td>{datePoints}</td>
  //     <td>{datePointsBlur}</td>
  //     <td>
  //       {spatial.s} | {spatial.b}
  //     </td>
  //   </tr>
  // )
}
