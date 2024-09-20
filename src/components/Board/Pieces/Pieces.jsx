import styles from './Pieces.module.css';
import Piece from './Piece';

const Pieces = () => {
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

  console.log(position);

  return <div id={styles.pieces}>
    {position.map((r, rank) =>
      r.map((f, file) =>
        position[rank][file]
        ? <Piece
            key={rank+''+file}
            rank={rank}
            file={file}
            piece={position[rank][file]}
          />
        : null
      )
    )}
  </div>
}

export default Pieces;