import { useAppContext } from '../../../contexts/Context';
import { copyPosition } from '../../../helper';
import { clearCandidateMoves, makeNewMove } from '../../../reducer/actions/move';
import styles from './PromotionBox.module.css';
import pieceStyles from '../../Board/Pieces/Pieces.module.css';

const PromotionBox = ({onClosePopup}) => {
  const { appState, dispatch } = useAppContext();
  const { promotionSquare } = appState;
  
  if (!promotionSquare) return null;
  
  const options = ['Q', 'R', 'B', 'N'];
  const color = promotionSquare.x === 7 ? 'W' : 'B';

  const handleClick = option => {
    onClosePopup();
    const newPosition = copyPosition(appState.position[appState.position.length - 1]);

    newPosition[promotionSquare.rank][promotionSquare.file] = '';
    newPosition[promotionSquare.x][promotionSquare.y] = color + option;

    dispatch(clearCandidateMoves());
    dispatch(makeNewMove({newPosition}));
  }

  return <div id={styles.popupInner}>
    {options.map(option => 
      <div 
        key={option} 
        className={`${styles.piece} ${pieceStyles.piece} ${pieceStyles[color+''+option]}`}
        onClick={() => handleClick(option)}
      />
    )}
  </div>
}

export default PromotionBox;