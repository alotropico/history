import { RowProps } from '../types'
import style from '../style/Row.module.scss'

export default function Row(props: RowProps) {
  const { type, set, name, fullName, tax, place, s, e, sd, ed, dates } = props
  const datePoints = [s, e].filter((a) => a).join(' | ')
  const datePointsBlur = [sd, ed].join(' | ')
  return (
    <tr className={style.row}>
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
    </tr>
  )
}
