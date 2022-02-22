import React from 'react'

export type PortalProps = React.PropsWithChildren<{
  children: React.ReactElement
  className?: string
  el?: 'div'
}>
