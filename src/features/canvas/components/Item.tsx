import { SpatialItem } from '../../../types'

export default function Item({ type, set, name, fullName, tax, place, s, e, sd, ed, dates, spatial }: SpatialItem) {
  const datePoints = [s, e].filter((a) => a).join(' | ')
  const datePointsBlur = [sd, ed].join(' | ')
  return (
    <tr>
      <td>{type}</td>
      <td>{set}</td>
      <td>
        <strong>{name}</strong>
        {fullName && ` (${fullName})`}
      </td>
      <td>{tax}</td>
      <td>{place}</td>
      <td>{dates}</td>
      <td>{datePoints}</td>
      <td>{datePointsBlur}</td>
      <td>
        {spatial.s} | {spatial.b}
      </td>
    </tr>
  )
}
