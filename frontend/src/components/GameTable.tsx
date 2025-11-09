import React from 'react';
import Card from './Card';

const GameTable = ({ currentRoom, currentHandCards, isWaiting, isMyTurn, currentTurn }: any) => (
  <div className="bg-table-green/80 rounded-lg shadow-lg p-8 min-h-[500px]">
    <div className="text-center mb-8">
      {isWaiting ? (
        <div className="text-white text-xl">
          Waiting for {4 - currentRoom.players.length} more player(s)...
        </div>
      ) : (
        <div className="text-white text-xl">
          {isMyTurn ? (
            <span className="text-yellow-300 font-bold">🎯 Your Turn! Play a card</span>
          ) : (
            <span>Waiting for {currentRoom.players[currentTurn]?.name}'s turn...</span>
          )}
        </div>
      )}
    </div>

    {/* Current Hand */}
    <div className="flex justify-center items-center mb-8">
      {currentHandCards.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {currentHandCards.map((play: any, i: number) => (
            <div key={i} className="text-center">
              <Card card={play.card} />
              <p className="text-white text-sm mt-2">
                {currentRoom.players[play.playerPosition]?.name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-64 flex items-center">
          <div className="text-white text-6xl opacity-20">🃏</div>
        </div>
      )}
    </div>
  </div>
);

export default GameTable;
