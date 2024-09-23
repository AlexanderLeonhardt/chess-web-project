import { getBishopMoves, getKingMoves, getKnightMoves, getPawnMoves, getQueenMoves, getRookMoves } from "./getMoves";

const arbiter = {
  getRegularMoves: function({position, piece, rank, file}) {
    if (piece.endsWith('K'))
      return getKingMoves({position, piece, rank, file});
    if (piece.endsWith('Q'))
      return getQueenMoves({position, piece, rank, file});
    if (piece.endsWith('B'))
      return getBishopMoves({position, piece, rank, file});
    if (piece.endsWith('N'))
      return getKnightMoves({position, rank, file});
    if (piece.endsWith('R'))
      return getRookMoves({position, piece, rank, file});
    if (piece.endsWith('P'))
      return getPawnMoves({position, piece, rank, file});
  }
}

export default arbiter;