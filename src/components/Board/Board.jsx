import styles from './Board.module.css';
import Files from './Bits/Files';
import Ranks from './Bits/Ranks';
import Pieces from './Pieces/Pieces';
import { useAppContext } from '../../contexts/Context';
import Popup from '../Popup/Popop';
import arbiter from '../../arbiter/arbiter';
import { getKingPosition } from '../../arbiter/getMoves';
import PromotionBox from '../Popup/PromotionBox/PromotionBox';
import GameEnds from '../Popup/GameEnds/GameEnds';

function Board() {

  const ranks = Array(8).fill().map((x, i) => 8-i);
  const files = Array(8).fill().map((x, i) => i+1);

  const {appState} = useAppContext();
  const position = appState.position[appState.position.length-1];

  const isChecked = (() => {
    const inInCheck = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      player: appState.turn
    });
    if (inInCheck)
      return getKingPosition(position, appState.turn)

    return null
  })();

  const getCheckHighlight = (i, j) => (isChecked && isChecked[0] === i && isChecked[1] === j) ? styles.checked : '';

  const getColor = (i, j) => styles[(i + j) % 2 === 0 ? 'dark' : 'light'];

  const validMoves = (i, j) => {
    if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
      if (position[i][j])
        return styles.attacking;
      else
        return styles.highlight;
    }
  }

  return <div id={styles.board}>
    <Ranks ranks={ranks}/>
    <div id={styles.tiles}>
      {ranks.map((rank, i) =>
        files.map((file, j) => {
          return <div 
            key={rank+''+file}
            className={`${styles.tile} ${getColor(7-i, j)} ${validMoves(7-i, j)} ${getCheckHighlight(7-i, j)}`}
          ></div>
        })
      )}
    </div>
    <Pieces />
    <Popup>
      <PromotionBox />
      <GameEnds />
    </Popup>
    <Files files={files}/>
  </div>
}

export default Board;