import styles from './Pieces.module.css';

const Piece = ({rank, file, piece}) => {

  const onDragStart = event => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', `${piece},${rank},${file}`);
    setTimeout(() => {
      event.target.style.display = 'none';
    }, 0);
  }

  return (
    <div 
      className={`${styles.piece} ${styles[piece]} ${styles[`p-${file}${rank}`]}`}
      draggable
      onDragStart={onDragStart}
    />
  );
}

export default Piece;