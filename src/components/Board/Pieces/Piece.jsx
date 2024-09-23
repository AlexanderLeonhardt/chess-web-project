import styles from './Pieces.module.css';
import { useAppContext } from '../../../contexts/Context';
import arbiter from '../../../arbiter/arbiter';
import { generateCandidateMoves } from '../../../reducer/actions/move';

const Piece = ({rank, file, piece}) => {

  const {appState, dispatch} = useAppContext();
  const {turn, position} = appState;

  const onDragStart = event => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);
    setTimeout(() => {
      event.target.style.display = 'none';
    }, 0);

    if (turn === piece[0]) {
      const candidateMoves = arbiter.getRegularMoves({
        position: position[position.length - 1], 
        prevPosition: position[position.length - 2],
        piece, 
        rank, 
        file
      });
      dispatch(generateCandidateMoves({candidateMoves}));
    }
  }

  const onDragEnd = event => {
    event.target.style.display = 'block';
  }

  return (
    <div 
      className={`${styles.piece} ${styles[piece]} ${styles[`p-${file}${rank}`]}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
}

export default Piece;