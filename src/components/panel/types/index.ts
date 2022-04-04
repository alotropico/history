export type panelProps = React.PropsWithChildren<{
  title?: string
  draggable?: boolean
  toggable?: boolean
  openDefault?: boolean
  className?: string
  theme?: 'standalone'
}>
