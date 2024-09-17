import { useState } from "react";

const board = [
  ['BR', 'BN', 'BB', 'BQ', 'BK', 'BB', 'BN', 'BR'], 
  ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'], 
  ['', '', '', '', '', '', '', ''],  
  ['', '', '', '', '', '', '', ''], 
  ['', '', '', '', '', '', '', ''],  
  ['', '', '', '', '', '', '', ''], 
  ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],  
  ['WR', 'WN', 'WB', 'WQ', 'WK', 'WB', 'WN', 'WR'], 
];

function Board() {
  const [boardState, setBoardState] = useState(board);
  const [selectedPiece, setSelectedPiece] = useState(null);

  function handleClick(rowIndex, tileIndex) {
    if (!selectedPiece && boardState[rowIndex][tileIndex]) {
      setSelectedPiece({ rowIndex, tileIndex });
    } else if (selectedPiece) {
      const updatedBoard = boardState.map((row, rIndex) =>
        row.map((tile, tIndex) => {
          if (rIndex === selectedPiece.rowIndex && tIndex === selectedPiece.tileIndex) {
            return '';
          }
          if (rIndex === rowIndex && tIndex === tileIndex) {
            return boardState[selectedPiece.rowIndex][selectedPiece.tileIndex];
          }
          return tile;
        })
      );
      
      setBoardState(updatedBoard);
      setSelectedPiece(null);
    }
  }

  return (
    <div className="board">
      {boardState.map((row, rowIndex) =>
        <div key={rowIndex} className="row">
          {row.map((tile, tileIndex) =>
            <div 
              key={`${rowIndex},${tileIndex}`}
              onClick={() => handleClick(rowIndex, tileIndex)}
              className={`tile ${selectedPiece && selectedPiece.rowIndex === rowIndex && selectedPiece.tileIndex === tileIndex ? 'selected' : ''}`}
            >
              {tile && <img src={`src/assets/pieces/${tile}.svg`} alt={tile} className="piece"/>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Board;