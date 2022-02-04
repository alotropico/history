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
      placeholder='Search. ie: Scipio, Alexander'
      onFocus={(event) => event.target.select()}
    />
  )
}
