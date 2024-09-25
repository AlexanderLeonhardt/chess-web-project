import { createPosition } from "./helper";

export const Status = {
  'ongoing': 'Ongoing',
  'promoting': 'Promoting',
  'white': 'White wins',
  'black': 'Black wins'
}

export const initGameState = {
  position: [createPosition()],
  turn: 'W',
  candidateMoves: [],
  status: Status.ongoing,
  promotionSquare: null
}