import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { PortalProps } from './types'

export default function Portal({ children, className = 'root-portal', el = 'div' }: PortalProps) {
  const [container] = useState(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return document.createElement(el)
  })

  useEffect(() => {
    container.classList.add(className)
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}
