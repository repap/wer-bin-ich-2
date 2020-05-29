import * as ACTION_TYPES from "./actionTypes";

export const gameStateChangeAction = gameState => ({
  type: ACTION_TYPES.CHANGE_GAME_STATE,
  gameState,
})