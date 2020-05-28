import React, { Fragment } from 'react'

export const Default = ({ children }) => {
  return (
    <Fragment>
      <header>
        <h1>
          Wer bin ich
        </h1>
      </header>
      <div className="content">
        { children }
      </div>
    </Fragment>
  )
}
