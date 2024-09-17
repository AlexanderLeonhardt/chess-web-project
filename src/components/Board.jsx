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
    <board>
      {boardState.map((row, rowIndex) =>
        row.map((tile, tileIndex) => {
          return <tile key={`${rowIndex},${tileIndex}`}>{tile}</tile>
        })
      )}
    </board>
  );
}

export default Board;