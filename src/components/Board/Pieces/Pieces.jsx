import styles from './Pieces.module.css';
import Piece from './Piece';
import { useState, useRef } from 'react';
import { copyPosition, createPosition } from '../../../helper';

const Pieces = () => {
  const ref = useRef();
  const [state, setState] = useState(createPosition);

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
  const onDrop = event => {
    const newPosition = copyPosition(state);
    const {x, y} = calculateCoords(event);
    const [piece, rank, file] = event.dataTransfer.getData('text').split(',');
    
    newPosition[rank][file] = '';
    newPosition[x][y] = piece;

    setState(newPosition);
  }

  return <div 
    id={styles.pieces}
    ref={ref}
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    {state.map((r, rank) =>
      r.map((f, file) =>
        state[rank][file]
        ? <Piece
            key={rank+''+file}
            rank={rank}
            file={file}
            piece={state[rank][file]}
          />
        : null
      )
    )}
  </div>
}

export default Pieces;