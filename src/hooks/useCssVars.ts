import { useContext, useEffect } from 'react'

import useWindowsSize from './useWindowSize'
import { AppContext } from '../providers/Context'

// Watches custom CSS properties
// and makes them available for React
// through global store
export default function useCssVars(): void {
  const { width: bodyWidth, height: bodyHeight } = useWindowsSize()

  const { setTransitionsSpeed, setDevice } = useContext(AppContext)

  useEffect(() => {
    setDevice(getCustomProperty('device'))
    setTransitionsSpeed(getCustomProperty('transitions-speed'))
  }, [bodyWidth, bodyHeight, setTransitionsSpeed, setDevice])
}

// Gets CSS custom property
export function getCustomProperty(property: string): string {
  return window
    .getComputedStyle(document.body)
    .getPropertyValue('--' + property)
    .replace(/"/g, '')
    .trim()
}
