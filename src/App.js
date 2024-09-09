import React, { useState } from 'react';
import calculateWinner from './calculateWinner';
import './style.css';

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Board = () => {
  const [isNextPlayerX, setIsNextPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [tableau, setTableau] = useState(['', '', '', '', '', '', '', '', '']);

  const onUserClick = (i) => {
    if (winner) return;
    if (tableau[i] == '') {
      const valueToSet = isNextPlayerX ? 'X' : 'O';
      const nouveauTableau = [...tableau]; // Créer nouveau tableau
      nouveauTableau[i] = valueToSet;
      setTableau(nouveauTableau);
      setIsNextPlayerX(!isNextPlayerX);
      setWinner(calculateWinner(nouveauTableau));
    }
  };

  const restart = () => {
    setTableau(['', '', '', '', '', '', '', '', '']);
    setIsNextPlayerX(true);
    setWinner(null);
  };

  const renderSquare = (i) => {
    const value = tableau[i];
    return <Square value={value} onClick={() => onUserClick(i)} />;
  };

  const status = winner ? (
    <b>Le gagnant est {winner}</b>
  ) : (
    'Next player: ' + (isNextPlayerX ? 'X' : 'O')
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      {winner && <button onClick={restart}>Recommencer</button>}
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
};

export default Game;
