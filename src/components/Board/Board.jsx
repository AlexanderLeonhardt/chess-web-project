import { getCharacter } from '../../helper';
import styles from './Board.module.css';

function Board() {

  const ranks = Array(8).fill().map((x, i) => 8-i);
  const files = Array(8).fill().map((x, i) => getCharacter(i));

  const getColor = (i, j) => styles[(i + j) % 2 === 0 ? 'light' : 'dark'];

  return <div id={styles.board}>
    <div id={styles.tiles}>
      {ranks.map((rank, i) =>
        files.map((file, j) => {
          return <div 
            key={rank+''+file}
            className={`${styles.tile} ${getColor(i, j)}`}
          >{rank}{file}</div>
        })
      )}
    </div>
  </div>
}

export default Board;