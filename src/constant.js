import { createPosition } from "./helper";

export const Status = {
  'ongoing': 'Ongoing',
  'promoting': 'Promoting',
  'white': 'White wins',
  'black': 'Black wins',
  'stalemate': 'Game draws due to stalemate',
  'insufficient': 'Game draws due to insuffucient material'
}

export const initGameState = {
  position: [createPosition()],
  turn: 'W',
  candidateMoves: [],
  status: Status.ongoing,
  promotionSquare: null,
  castleDirection: {
    W: 'both',
    B: 'both',
  }
}