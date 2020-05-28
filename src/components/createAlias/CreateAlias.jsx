import React, { useState } from 'react'

export const CreateAlias = () => {
  const mitspieler = 'Hans'
  const [alias, setAlias] = useState('');
  return (
    <div>
      <h3>{mitspieler} braucht noch einen Alias</h3>
      Wer soll {mitspieler} sein?!?<br />
      <input 
        type="text"
        name="alias"
        value={alias}
        onChange={e => setAlias(e.target.value)}
      />
      <button disabled={!alias.length} >Ok, {mitspieler} ist jetzt {alias}!</button>
    </div>
  )
}
