export const getCharacter = n => String.fromCharCode(n + 96);

export const createPosition = () => {
  const position = new Array(8).fill('').map(x => new Array(8).fill(''));

  for (let i = 0; i < 8; i++) {
    position[1][i] = 'WP';
    position[6][i] = 'BP';
  }
  position[0][0] = 'WR';
  position[0][1] = 'WN';
  position[0][2] = 'WB';
  position[0][3] = 'WQ';
  position[0][4] = 'WK';
  position[0][5] = 'WB';
  position[0][6] = 'WN';
  position[0][7] = 'WR';
  position[7][0] = 'BR';
  position[7][1] = 'BN';
  position[7][2] = 'BB';
  position[7][3] = 'BQ';
  position[7][4] = 'BK';
  position[7][5] = 'BB';
  position[7][6] = 'BN';
  position[7][7] = 'BR';

  return position;
}

export const copyPosition = position => {
  const newPosition = new Array(8).fill('').map(x => new Array(8).fill(''));

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      newPosition[rank][file] = position[rank][file]
    }
  }
  return newPosition;
}

export const areSameColorTiles = (coords1, coords2) =>
  (coords1.x + coords1.y) % 2 === (coords2.x + coords2.y) % 2;

export const findPieceCoords = (position, type) => {
  let results = [];
  position.forEach((rank, i) => {
    rank.forEach((pos, j) => {
      if (pos === type) results.push({x: i, y: j});
    });
  });
  return results;
}