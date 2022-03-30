import React, { createContext, useState } from 'react'
import CssVars from './components/CssVars'

import { AppContextProviderProps } from './types'

export const AppContext = createContext<any>({})

export default function AppContextProvider({ children }: AppContextProviderProps): React.ReactElement {
  // CSS custom properties defined in /styles/_vars.scss
  // made available for JS
  const [transitionsSpeed, setTransitionsSpeed] = useState(300)
  const [device, setDevice] = useState('')

  const contextValue = {
    transitionsSpeed,
    setTransitionsSpeed,
    device,
    setDevice,
  }

  return (
    <AppContext.Provider value={contextValue}>
      <CssVars />
      {children}
    </AppContext.Provider>
  )
}
