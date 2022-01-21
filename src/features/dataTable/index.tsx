import Row from './components/Row'
import { IItems } from '../canvas/types'
import style from './style/DataTable.module.scss'

export default function Canvas({ items }: { items: IItems }) {
  return <table className={style.table}>{items.map((item) => item?.name && <Row key={item.id} {...item} />)}</table>
}
