import React, { Fragment } from 'react'

export const BaseLayout = ({children}) => {
  return (
    <Fragment>
      <header>
        <div>Menu</div>
        <h1>Wer Bin Ich</h1>
        <div>chat</div>
      </header>
      <div className="conten">
        {children}
      </div>
    </Fragment>
  )
}
