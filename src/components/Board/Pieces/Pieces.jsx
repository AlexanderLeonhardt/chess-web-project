import styles from './Pieces.module.css';
import Piece from './Piece';
import { useRef } from 'react';
import arbiter from '../../../arbiter/arbiter';
import { useAppContext } from '../../../contexts/Context';
import { clearCandidateMoves, makeNewMove } from '../../../reducer/actions/move';

const Pieces = () => {
  const ref = useRef();

  const {appState, dispatch} = useAppContext();

  const currentPosition = appState.position[appState.position.length-1];

  const calculateCoords = event => {
    const {width, left, top} = ref.current.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((event.clientX - left) / size);
    const x = 7 - Math.floor((event.clientY - top) / size);
    return {x, y};
  }

  const onDragOver = event => {
    event.preventDefault();
  }

  const move = event => {
    const {x, y} = calculateCoords(event);
    const [piece, rank, file] = event.dataTransfer.getData('text').split(',');

    if (appState.candidateMoves?.find(m => m[0] === x && m[1] === y)) {
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank,
        file,
        x,
        y,
      });
      dispatch(makeNewMove({newPosition}));
    }
    dispatch(clearCandidateMoves());
  }

  const onDrop = event => {
    event.preventDefault();

    move(event);
  }

  return <div 
    id={styles.pieces}
    ref={ref}
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    {currentPosition.map((r, rank) =>
      r.map((f, file) =>
        currentPosition[rank][file]
        ? <Piece
            key={rank+''+file}
            rank={rank}
            file={file}
            piece={currentPosition[rank][file]}
          />
        : null
      )
    )}
  </div>
}

export default Pieces;