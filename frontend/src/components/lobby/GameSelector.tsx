import React from 'react';
import { GameType } from '@shared/types';

interface Props {
  selectedGame: GameType;
  setSelectedGame: (game: GameType) => void;
  disabled: boolean;
}

const GameSelector: React.FC<Props> = ({ selectedGame, setSelectedGame, disabled }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-3">Select Game</label>
    <div className="grid grid-cols-2 gap-3">
      {Object.values(GameType).map((game) => (
        <button
          key={game}
          onClick={() => setSelectedGame(game)}
          disabled={disabled}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedGame === game
              ? 'border-purple-500 bg-purple-50 shadow-md'
              : 'border-gray-300 hover:border-purple-300'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="text-2xl mb-2">🎯</div>
          <div className="font-bold text-sm">{game.replace('_', '-')}</div>
        </button>
      ))}
    </div>
  </div>
);

export default GameSelector;
