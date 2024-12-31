import React from 'react';
import { MOVES } from './constants';

const GameUtils = () => {
  const getWinner = (player1Move, player2Move) => {
    if (player1Move === player2Move) return 'draw';
    if (
      (player1Move === MOVES.ROCK && player2Move === MOVES.SCISSORS) ||
      (player1Move === MOVES.PAPER && player2Move === MOVES.ROCK) ||
      (player1Move === MOVES.SCISSORS && player2Move === MOVES.PAPER)
    ) {
      return 'player1';
    }
    return 'player2';
  };

  return { getWinner };
};

export default GameUtils;
