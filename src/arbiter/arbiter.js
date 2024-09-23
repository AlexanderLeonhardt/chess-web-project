import { getBishopMoves, getKnightMoves, getRookMoves } from "./getMoves";

const arbiter = {
  getRegularMoves: function({position, piece, rank, file}) {
    if (piece.endsWith('B'))
      return getBishopMoves({position, piece, rank, file});
    if (piece.endsWith('N'))
      return getKnightMoves({position, rank, file});
    if (piece.endsWith('R'))
      return getRookMoves({position, piece, rank, file});
  }
}

export default arbiter;