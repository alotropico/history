import React, { useState } from 'react'
import Portal from '../portal/portal'

import './style/popup.scss'

type popUpProps = {
  title: string
  children: React.ReactElement
  bottom: React.ReactElement
  className?: string
}

export default function PopUp({ title, children, bottom, ...props }: popUpProps) {
  const [maximize, setMaximize] = useState(false)
  const className = ['popup', maximize ? 'popup--maximize' : '', props.className].filter((a) => a).join(' ')

  return (
    <Portal>
      <div className={className}>
        <div className='popup_veil'></div>
        <div className='popup_window w2ui-popup'>
          <div className='popup_window_top'>
            <div className='popup_window_top_title'>{title}</div>
            <div className='w2ui-popup-button w2ui-popup-max' onClick={() => setMaximize(!maximize)} />
          </div>
          <div className='popup_window_main'>{children}</div>
          <div className='popup_window_bottom'>{bottom}</div>
        </div>
      </div>
    </Portal>
  )
}
