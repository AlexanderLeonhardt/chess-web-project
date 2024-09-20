import styles from './Pieces.module.css';

const Piece = ({rank, file, piece}) => {
  return (
    <div 
      className={`${styles.piece} ${styles[piece]} ${styles[`p-${file}${rank}`]}`}
      draggable
    />
  )
}

export default Piece;