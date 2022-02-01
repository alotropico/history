import parseYear from '../../utils/parseYear'
import { ScaleProps } from './types'
import style from './style/Scale.module.scss'

export default function Scale({ start, end }: ScaleProps) {
  const dif = end - start

  const rawItems = Array.from(Array(11).keys())
    .map((i) => Math.round((start + (i / 11) * dif) / 100) * 100)
    .filter((i) => i > start && i < end)

  const items = uniq(rawItems).map((i) => {
    return {
      text: parseYear(i),
      style: {
        left: `${((i - start) / dif) * 100}%`,
      },
    }
  })

  return (
    <div className={style.scale}>
      {items.map((item) => (
        <div key={item.text} style={item.style}>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  )
}

const uniq = (a: number[]): number[] => [...new Set(a)]
