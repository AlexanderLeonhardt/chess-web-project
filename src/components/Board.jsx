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
  const [lastMove, setLastMove] = useState(null);
  const [promotionModal, setPromotionModal] = useState(null);
  const [promotingPiece, setPromotingPiece] = useState(null);

  function validateMove(piece, fromRow, fromTile, toRow, toTile) {
    const direction = piece[0] === 'W' ? -1 : 1;
    const pieceType = piece[1];

    switch (pieceType) {
      case 'P':
        if (fromTile === toTile) {
          // 1 step
          if (toRow === fromRow + direction && boardState[toRow][toTile] === '') return true;
          // 2 steps
          if ((fromRow === (direction === -1 ? 6 : 1)) && toRow === fromRow + 2 * direction && boardState[toRow][toTile] === '' && boardState[fromRow + direction][toTile] === '') {
            setLastMove({ fromRow, fromTile, toRow, toTile });
            return true;
          }
        }
        // capturing
        if (Math.abs(fromTile - toTile) === 1 && toRow === fromRow + direction) {
          if (boardState[toRow][toTile] && boardState[toRow][toTile][0] !== piece[0]) return true;
          // en passant
          if (lastMove && lastMove.toRow === fromRow && Math.abs(lastMove.toTile - fromTile) === 1) {
            if (boardState[fromRow][toTile][1] === 'P' && boardState[fromRow][toTile][0] !== piece[0]) return true;
          }
        }
        return false;

      default:
        return false;
    }
  }

  function handlePromotion(toRow, toTile, newPiece) {
    const fromRow = promotingPiece.rowIndex;
    const fromTile = promotingPiece.tileIndex;

    const updatedBoard = boardState.map((row, rowIndex) =>
      row.map((tile, tileIndex) => {
        if (rowIndex === fromRow && tileIndex === fromTile) return '';
        if (rowIndex === toRow && tileIndex === toTile) return newPiece;
        return tile;
      })
    );
    
    setBoardState(updatedBoard);
    setPromotionModal(null);
    setPromotingPiece(null);
  }

  function movePiece(toRow, toTile) {
    const fromRow = selectedPiece.rowIndex;
    const fromTile = selectedPiece.tileIndex;

    if (boardState[fromRow][fromTile][1] === 'P' && (toRow === 0 || toRow === 7)) {
      // Trigger promotion
      setPromotionModal({ toRow, toTile });
      setPromotingPiece({ rowIndex: fromRow, tileIndex: fromTile });
    } else {
      const updatedBoard = boardState.map((row, rowIndex) =>
        row.map((tile, tileIndex) => {
          if (rowIndex === fromRow && tileIndex === fromTile) return '';
          if (rowIndex === toRow && tileIndex === toTile) return boardState[fromRow][fromTile];
          return tile;
        })
      );
      setBoardState(updatedBoard);
    }

    setSelectedPiece(null);  // Clear selected piece after move
  }

  // for mobile
  function handleClick(rowIndex, tileIndex) {
    if (!selectedPiece && boardState[rowIndex][tileIndex]) {
      setSelectedPiece({ rowIndex, tileIndex });
    } else if (selectedPiece) {
      if (validateMove(
        boardState[selectedPiece.rowIndex][selectedPiece.tileIndex],
        selectedPiece.rowIndex,
        selectedPiece.tileIndex,
        rowIndex,
        tileIndex
      )) {
        movePiece(rowIndex, tileIndex);
      }
      setSelectedPiece(null);
    }
  }
  // for desktop
  function onDragStart(rowIndex, tileIndex) {
    if (boardState[rowIndex][tileIndex]) {
      setSelectedPiece({ rowIndex, tileIndex });
    }
  }
  function onDragOver(event) {
    event.preventDefault();
  }
  function onDrop(event, rowIndex, tileIndex) {
    event.preventDefault();
    if (selectedPiece && validateMove(
      boardState[selectedPiece.rowIndex][selectedPiece.tileIndex],
      selectedPiece.rowIndex,
      selectedPiece.tileIndex,
      rowIndex,
      tileIndex
    )) {
      movePiece(rowIndex, tileIndex);
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
              className={`tile ${selectedPiece && selectedPiece.rowIndex === rowIndex && selectedPiece.tileIndex === tileIndex ? 'selected' : ''}`}
              onClick={() => handleClick(rowIndex, tileIndex)}
              onDragOver={onDragOver}
              onDrop={(event) => onDrop(event, rowIndex, tileIndex)}
            >
              {tile &&
                <img
                  src={`src/assets/pieces/${tile}.svg`}
                  alt={tile}
                  className="piece"
                  draggable
                  onDragStart={() => onDragStart(rowIndex, tileIndex)}
                />
              }
            </div>
          )}
        </div>
      )}

      {promotionModal && (
        <div className="promotion-modal">
          <button onClick={() => handlePromotion(promotionModal.toRow, promotionModal.toTile, 'WQ')}>Queen</button>
          <button onClick={() => handlePromotion(promotionModal.toRow, promotionModal.toTile, 'WR')}>Rook</button>
          <button onClick={() => handlePromotion(promotionModal.toRow, promotionModal.toTile, 'WB')}>Bishop</button>
          <button onClick={() => handlePromotion(promotionModal.toRow, promotionModal.toTile, 'WN')}>Knight</button>
        </div>
      )}
    </div>
  );
}

export default Board;