import { getBishopMoves, getKingMoves, getKnightMoves, getPawnCaptures, getPawnMoves, getQueenMoves, getRookMoves, getCastlingMoves, getKingPosition, getPieces } from "./getMoves";
import { movePawn, movePiece } from "./move";

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
  },

  getValidMoves: function({position, prevPosition, castleDirection, piece, rank, file}) {
    let moves = this.getRegularMoves({position, piece, rank, file});
    const notInCheckMoves = [];

    if (piece.endsWith('P')) {
      moves = [
        ...moves,
        ...getPawnCaptures({position, prevPosition, piece, rank, file})
      ];
    }
    if (piece.endsWith('K')) {
      moves = [
        ...moves,
        ...getCastlingMoves({position, castleDirection, piece, rank, file})
      ];
    }

    moves.forEach(([x, y]) => {
      const positionAfterMove = this.performMove({position, piece, rank, file, x, y});

      if (!this.isPlayerInCheck({positionAfterMove, position, player: piece[0]}))
        notInCheckMoves.push([x, y]);
    })
    return notInCheckMoves;
  },

  performMove: function({position, piece, rank, file, x, y}) {
    if (piece.endsWith('P')) {
      return movePawn({position, piece, rank, file, x, y})
    } else { 
      return movePiece({position, piece, rank, file, x, y})
    }
  },

  isPlayerInCheck: function({positionAfterMove, position, player}) {
    const enemy = player.startsWith('W') ? 'B' : 'W';
    let kingPos = getKingPosition(positionAfterMove, player);
    const enemyPieces = getPieces(positionAfterMove, enemy);

    const enemyMoves = enemyPieces.reduce((acc, p) => acc = [
      ...acc,
      ...(p.piece.endsWith('P'))
      ? getPawnCaptures({
        position: positionAfterMove,
        prevPosition: position,
        ...p
      })
      : this.getRegularMoves({
        position: positionAfterMove,
        ...p
      })
    ], []);

    if (enemyMoves.some(([x, y]) => kingPos[0] === x && kingPos[1] === y))
      return true;

    return false;
  }
}

export default arbiter;