import Row from './components/Row'
import { DataTableProps } from './types'
import style from './style/DataTable.module.scss'

export default function DataTable({ items }: DataTableProps) {
  return <table className={style.table}>{items.map((item) => item?.name && <Row key={item.id} {...item} />)}</table>
}
