import React from 'react';
import { GameType } from '@shared/types';

const LobbyFooter: React.FC<{ selectedGame: GameType }> = ({ selectedGame }) => (
  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
    <p className="text-center text-sm text-gray-700 font-semibold mb-2">
      🎮 {selectedGame === GameType.EASY_PEASY ? 'Easy-Peasy' : 'Dehla-Pakad'}
    </p>
    <p className="text-center text-xs text-gray-600">Waiting for 4 players to start the game</p>
  </div>
);

export default LobbyFooter;
