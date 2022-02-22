import { useContext } from 'react'

import { BoardContext } from '../board'
import style from './style/Search.module.scss'

export default function Search() {
  const { setHighlights } = useContext(BoardContext)

  const handleChange = (e) => setHighlights(e.target.value)

  return (
    <input
      defaultValue=''
      onChange={handleChange}
      className={style.input}
      placeholder='Try “Cleopatra” “Scipio” “Athens” “400”'
      onFocus={(event) => event.target.select()}
      type='search'
    />
  )
}
