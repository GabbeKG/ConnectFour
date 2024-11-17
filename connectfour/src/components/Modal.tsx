import React from 'react'

const Modal: React.FC<{ winner: 1 | 2; onReset: () => void }> = ({ winner, onReset }) => {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Player {winner} Wins!</h2>
          <button onClick={onReset}>Play Again</button>
        </div>
      </div>
    );
  };
  

export default Modal