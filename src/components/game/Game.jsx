import React, { Fragment } from 'react'
import { Player } from '../../presentations/player/Player'
import { AppState } from '../app/App';
import { gameStateChangeAction } from '../../actions/game';
import { STATES } from '../../const/game';

export const Game = ({ activePlayer }) => {
  const { dispatch } = React.useContext(AppState);
  const endGame = () => dispatch(gameStateChangeAction(STATES.GAME_END))
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
            Muss jetzt seine Fragen stellen!
          </Fragment>)
        }
      </div>
      <div>
        {activePlayer
          ? (<div>Stell deine <b>JA</b>, <b>NEIN</b> Fragen jetzt!!!</div>)
          : (<Fragment>
              <div>
              <button onClick={endGame}>Yap, <b>{name}</b> weiß wer er ist!!!</button>
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
