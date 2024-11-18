import React, { useState } from "react";

type Cell = null | 1 | 2; 
  type Board = Cell[][];
  
  const createEmptyBoard = (): Board =>
    Array.from({ length: 7 }, () => Array(7).fill(null));

const ConnectFour: React.FC = () => {
    const [board, setBoard] = useState<Board>(createEmptyBoard());
    
    const renderCell = (cell: Cell, rowIndex: number, colIndex: number) => (
        <>
        
      <div
        key={`${rowIndex}-${colIndex}`}
        className={`cell ${cell === 1 ? "player-one" : cell === 2 ? "player-two" : ""}`}
        
        onClick={() => handleCellClick(rowIndex, colIndex)}
        >
            </div>
            
          </>
    );
  
    const handleCellClick = (rowIndex: number, colIndex: number) => {
        for (let row = board.length - 1; row >= 0; row--) {
          if (board[row][colIndex] === null) {
            const newBoard = board.map(row => [...row]);
              newBoard[row][colIndex] = currentPlayer;
              console.log(rowIndex)
            setBoard(newBoard);
                  
            if (checkWin(newBoard, row, colIndex, currentPlayer)) {
                setWinner(currentPlayer);
              
              return;
            }
      
            togglePlayer();
            break;
          }
        }
      };
      
      const resetGame = () => {
        setBoard(createEmptyBoard());
        setWinner(null);
        setCurrentPlayer(1);
      };
       
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [winner, setWinner] = useState<1 | 2 | null>(null);

      
      const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    };
    const checkDirection = (
        board: Board,
        row: number,
        col: number,
        rowDir: number,
        colDir: number,
        player: 1 | 2
      ): boolean => {
        let count = 0;
      
        for (let i = 0; i < 4; i++) {
          const newRow = row + i * rowDir;
          const newCol = col + i * colDir;
      
          if (
            newRow >= 0 &&
            newRow < 7 &&
            newCol >= 0 &&
            newCol < 7 &&
            board[newRow][newCol] === player
          ) {
            count++;
          } else {
            break;
          }
        }
      
        return count === 4;
    };
    const checkWin = (board: Board, row: number, col: number, player: 1 | 2): boolean => {
        // Check all directions
        return (
          checkDirection(board, row, col, 0, 1, player) || // Horizontal
          checkDirection(board, row, col, 1, 0, player) || // Vertical
          checkDirection(board, row, col, 1, 1, player) || // Diagonal down-right
          checkDirection(board, row, col, 1, -1, player)   // Diagonal down-left
        );
      };
      const Modal: React.FC<{ winner: 1 | 2; onReset: () => void }> = ({ winner, onReset }) => {
        return (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>&#x1F525;Player {winner} Wins!&#x1F525;</h2>
              <button onClick={onReset}>Play Again</button>
            </div>
          </div>
        );
      };
      
  
    return (
        <>
            <div className="currentPlayer">
                <h2> Current Turn: Player { currentPlayer } </h2><div className={`player ${currentPlayer ===1? "player-one":"player-two"}`}></div>
            </div>
        <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
        )}
            </div>
            {winner !== null && <Modal winner={winner} onReset={resetGame} />}
        </>
    );
  };
  
  export default ConnectFour;