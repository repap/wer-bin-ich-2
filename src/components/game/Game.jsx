import React, { Fragment } from 'react'
import { Player } from '../../presentations/player/Player'

export const Game = ({ activePlayer }) => {
  const name = 'Dennis'
  return (
    <div>
      <h2>Das Spiel</h2>
      <div>
        {activePlayer
          ? (<Fragment>
              <Player name={name} id="12345" />
              Du bist dran!
            </Fragment>)
          : (<Fragment>
            <Player name={name} alias="Alf" id="12345" />
            Ist an der Reihe!
          </Fragment>)
        }
      </div>
      <div>
        {activePlayer
          ? (<div>Stell deine Fragen!</div>)
          : (<Fragment>
              <div>
                <button>Yap, <b>{name}</b> weiß wer er ist!!!</button>
              </div>
              <div>
                <button>Jo, das stimmt! <b>JA!</b></button>
                <button>Nö, das stimmt nicht! <b>NEIN!</b></button>
              </div>
          </Fragment>)
        }
      </div>
    </div>
  )
}
