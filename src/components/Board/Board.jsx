import { getCharacter } from '../../helper';
import styles from './Board.module.css';
import Files from './Bits/Files';
import Ranks from './Bits/Ranks';

function Board() {

  const ranks = Array(8).fill().map((x, i) => 8-i);
  const files = Array(8).fill().map((x, i) => getCharacter(i));

  const getColor = (i, j) => styles[(i + j) % 2 === 0 ? 'light' : 'dark'];

  return <div id={styles.board}>
    <Ranks ranks={ranks}/>
    <div id={styles.tiles}>
      {ranks.map((rank, i) =>
        files.map((file, j) => {
          return <div 
            key={rank+''+file}
            className={`${styles.tile} ${getColor(i, j)}`}
          ></div>
        })
      )}
    </div>
    <Files files={files}/>
  </div>
}

export default Board;