import React from 'react'

export const CopyLink = ({ link }) => {
  return (
    <div className="copyLink">
      <input type="text" disabled value={link} />
      <button>Link kopieren</button>
    </div>
  )
}
