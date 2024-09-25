import { copyPosition } from '../helper';

export const movePiece = ({position, piece, rank, file, x, y}) => {
  const newPosition = copyPosition(position);

  if (piece.endsWith('K') && Math.abs(y - file) > 1) {
    if (y === 2) {
      newPosition[rank][0] = '';
      newPosition[rank][3] = piece.startsWith('W') ? 'WR' : 'BR';
    }
    if (y === 6) {
      newPosition[rank][7] = '';
      newPosition[rank][5] = piece.startsWith('W') ? 'WR' : 'BR';
    }
  }

  newPosition[rank][file] = '';
  newPosition[x][y] = piece;

  return newPosition;
}

export const movePawn = ({position, piece, rank, file, x, y}) => {
  const newPosition = copyPosition(position);
  if (!newPosition[x][y] && x !== rank && y !== file)
    newPosition[rank][y] = '';

  newPosition[rank][file] = '';
  newPosition[x][y] = piece;

  return newPosition;
}