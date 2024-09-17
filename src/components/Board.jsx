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

  return (
    <div className="board">
      {boardState.map((row, rowIndex) =>
        <div key={rowIndex} className="row">
          {row.map((tile, tileIndex) => {
            return <div key={`${rowIndex},${tileIndex}`} className="tile" />
          })}
        </div>
      )}
    </div>
  );
}

export default Board;